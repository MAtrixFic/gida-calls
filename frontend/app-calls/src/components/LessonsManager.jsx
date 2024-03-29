import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/lessonmanager.css';
import { DateTime } from 'luxon';
import { SERVERIP } from './constantDatas/constsOfServer';

const LessonsManager = () => {

    const params = useParams();
    const [correctDate] = useState(() =>
        DateTime.local(Number(params.year), Number(params.month), Number(params.day)).setLocale('ru')
    )

    let [emptyLessonSign] = useState(() => '_')
    const nav = useNavigate();

    let lessonsRef = useRef([]);
    let [changing, setChanging] = useState(() => false);
    let [indexChanging, setIndexChanging] = useState(() => 0);

    let [classes, setClasses] = useState(() => GetData('lessons/classes').then(data => setClasses(data)));//запрос для классов
    let [classesList, setClassesList] = useState(() => []);//список классов

    let [lessonsListget, setLessonsListget] = useState(() => GetData('lessons/lessonslist').then(data => setLessonsListget(data)));//запрос для уроков
    let [lessonsList, setLessonsList] = useState(() => []);//список уроков

    let [className, setClassName] = useState(() => {
        let cn = localStorage.getItem('className');
        if (cn === null) {
            return '1А'
        }
        else {
            return cn
        }
    });
    let [lessons, setLessons] = useState(() => {
        GetClassShedule(className);
    })

    useEffect(() => {
        if (typeof classes[0] === 'string') {
            setClassesList(classes);
        }
    }, [classes]);

    useEffect(() => {
        if (typeof lessonsListget[0] === 'string') {
            setLessonsList(lessonsListget);
        }
    }, [lessonsListget])

    async function GetData(path, params = null, getOrSend = false) {
        let res = await fetch(`http://${SERVERIP.local}/${path}`, params);
        if (!getOrSend)
            return await res.json();
        else
            return await res;
    }

    function RedactLessons(event) {
        if (event.target.hasAttribute('class')) {
            if (event.target.className !== 'main__lesson-taking' && changing === true) {
                setChanging(false);
            }
            else if (event.target.className === 'main__lesson-taking' && changing === true) {
                setChanging(false);
                AddLesson(indexChanging, event.target.innerText);
            }
        }
        else {
            setChanging(false);
        }
    }

    function DeleteLesson(index) {
        let copy = Object.assign([], lessons);
        copy[index] = emptyLessonSign;
        setLessons(copy);
    }

    function AllowChanging(index) {
        setChanging(true)
        setIndexChanging(index)
    }

    function AddLesson(index, value) {
        let copy = Object.assign([], lessons);
        copy[index] = String(value);
        setLessons(copy);
    }

    function GetClassShedule(className) {
        GetData(`lessons/classes/${params.type}/${className}?` + new URLSearchParams({ weekDay: params.type === 'static' ? params.weekday : correctDate.weekdayLong, day: params.day, month: params.month, year: params.year })).then(data => {
            if (data.res !== 'empty') {
                let datalist = data.res.split(', ');
                let len = datalist.length;
                console.log(len)
                for (let i = 0; i < (10 - len); i++) {
                    datalist.push(emptyLessonSign)
                }
                setLessons(datalist)
            }
            else {
                setLessons(['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'])
            }
        })
    }

    function SendClassShedule() {
        console.log({
            data: lessons,
            weekDay: correctDate.weekdayLong,
            day: params.day,
            month: params.month,
            year: params.year
        })
        GetData(`lessons/classes/${params.type}/${className}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                "Authorization": localStorage?.auth
            },
            body: new URLSearchParams({
                data: lessons,
                weekDay: params.type ==='dynamic' ? correctDate.weekdayLong : params.weekday,
                day: params.day,
                month: params.month,
                year: params.year
            })
        }, true).then(res => res.status === 200 ? LeaveOrStand() : alert('Ошибка!'))
    }

    function LeaveOrStand() {
        let res = window.confirm('Данные изменены! Выйти?');
        res ? nav(-1) : nav();
    }

    function SelectCorrectClass(e) {
        setClassName(e.target.innerText);
        GetClassShedule(e.target.innerText);
        localStorage.setItem("className", e.target.innerText);
    }

    return (
        <div className='main__lesson-manager-box' onClick={RedactLessons}>
            <div className="main__lessons-panel-box">
                <div className="main__block-name-box">
                    <h1 className="main__block-name">Уроки <span className="main__block-chapter">{className}</span></h1>
                </div>
                <div className="main__lessons-managment">
                    {lessons?.map((el, i) => {
                        if (el === emptyLessonSign) {
                            return <div ref={current => lessonsRef.current[i] = current} onClick={() => AllowChanging(i)} key={i} className='main__lessons-plus'>{'+'}
                            </div>
                        }
                        else {
                            return (
                                <div ref={current => lessonsRef.current[i] = current} key={i} className='main__lessons-el'>
                                    {el}
                                    <button className='main__button-lesson-func' onClick={() => DeleteLesson(i)}>
                                        <svg className='main__lesson-func-sign' width="36" height="36" viewBox="0 0 36 36" fill="#e1e2e2" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8609 10.0496L24.3749 2.53553C24.7654 2.14501 25.3986 2.14501 25.7891 2.53553L33.098 9.84441C33.4885 10.2349 33.4885 10.8681 33.098 11.2586L25.584 18.7726L16.8609 10.0496ZM15.4467 11.4638L2.53578 24.3747C2.14525 24.7652 2.14525 25.3984 2.53578 25.7889L9.84465 33.0978C10.2352 33.4883 10.8683 33.4883 11.2589 33.0978L24.1698 20.1869L15.4467 11.4638ZM1.12157 27.2031C-0.0500077 26.0315 -0.0500064 24.132 1.12157 22.9605L22.9607 1.12132C24.1323 -0.0502538 26.0318 -0.0502531 27.2034 1.12132L34.5122 8.43019C35.6838 9.60177 35.6838 11.5013 34.5122 12.6728L12.6731 34.512C11.5015 35.6836 9.60201 35.6836 8.43044 34.512L1.12157 27.2031Z" />
                                        </svg>
                                    </button>
                                    <button className='main__button-lesson-func' onClick={() => AllowChanging(i)}>
                                        <svg className='main__lesson-func-sign' width="30" height="31" viewBox="0 0 30 31" fill="#e1e2e2" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.8652 2.82843L27.815 7.77817L24.2794 11.3137L19.3297 6.36396L22.8652 2.82843ZM17.9155 7.77817L4.28949 21.4042L2.63516 28.0082L9.23924 26.3539L22.8652 12.7279L17.9155 7.77817ZM21.451 1.41421C22.2321 0.633165 23.4984 0.633165 24.2794 1.41421L29.2292 6.36396C30.0102 7.14501 30.0102 8.41134 29.2292 9.19239L10.6535 27.7681C10.3974 28.0242 10.0765 28.206 9.72522 28.294L3.12115 29.9483C1.65575 30.3154 0.328023 28.9877 0.695107 27.5223L2.34943 20.9182C2.43744 20.5669 2.61918 20.246 2.87528 19.99L21.451 1.41421Z" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div className="main__data-list-box">
                <ul className={`main__lessons-list ${changing ? 'active' : 'passive'}`}>
                    {lessonsList?.map((el, i) => <li key={i} className='main__lesson-taking'>{el}</li>)}
                </ul>
                <ul className="main__classes-list">
                    {classesList?.map((el, i) => <li onClick={SelectCorrectClass} key={i}>{el}</li>)}
                </ul>
                <button className="main__send-info-button" onClick={SendClassShedule}>
                    ОТПРАВИТЬ
                </button>
            </div>
            <div className="main__correct-date-box">
                {params.type === 'dynamic' &&
                    <>
                        <span className='main__correct-month'>{correctDate.monthLong}</span>
                        <span className='main__correct-day'>{correctDate.toFormat('dd')}</span>
                        <span className='main__correct-weekday'>{correctDate.weekdayLong}</span>
                    </>
                }
                {params.type === 'static' &&
                    <>
                        <span className='main__correct-week-day'>{params.weekday}</span>
                    </>
                }
            </div>
        </div>
    );
}

export default LessonsManager;
