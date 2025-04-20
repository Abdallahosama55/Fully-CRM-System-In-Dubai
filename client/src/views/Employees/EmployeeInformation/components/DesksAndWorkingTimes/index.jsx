import { useState, useCallback } from 'react'
import DeskCardButton from 'components/common/DeskCardButton';
import TimeUtils from 'utils/time';
// style
import './styles.css';

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DesksAndWorkingTimes = ({ desks }) => {
    const getTotalTime = useCallback((desk) => {
        const newTotal = { hours: 0, minutes: 0 };
        Object.keys(desk.working_hours).forEach(day => {
            newTotal.hours = newTotal.hours + TimeUtils.calculateDuration(desk.working_hours[day].startTime, desk.working_hours[day].endTime).hours
            newTotal.minutes = newTotal.minutes + TimeUtils.calculateDuration(desk.working_hours[day].startTime, desk.working_hours[day].endTime).minutes
        })
        return newTotal;
    }, [])

    const [activeDesk, setActiveDesk] = useState(desks[0]);
    const [totalTime, setTotalTime] = useState(getTotalTime(desks[0]));

    const changeDesk = (desk) => {
        setActiveDesk(desk);
        setTotalTime(getTotalTime(desk))
    }

    return (
        <div className='desks_and_working_times'>
            <div className='desks'>
                {desks.map((desk, index) => <DeskCardButton key={index}
                    onClick={() => changeDesk(desk)}
                    isActive={activeDesk.id === desk.id}
                    name={desk.name}
                    image={desk.image}
                />)}
            </div>

            <div className="time_board">
                <div className="days_grid">
                    {WEEK_DAYS.map((day, index) => {
                        const isWorking = Boolean(activeDesk.working_hours[day]);
                        return <div key={day} className={`day_card ${!isWorking ? "empty_day_card" : ""}`}>
                            <p className='fz-14 text-center'>{day}</p>
                            <div className="divider"></div>
                            {isWorking ? <>
                                <p className='fz-10 gc text-center'>
                                    {TimeUtils.convertTimeToAmPm(activeDesk.working_hours[day]?.startTime)}
                                    {" "}to{" "}
                                    {TimeUtils.convertTimeToAmPm(activeDesk.working_hours[day]?.endTime)}
                                </p>
                                <p className='text-center fz-12'>{TimeUtils.calculateDuration(
                                    activeDesk.working_hours[day]?.startTime,
                                    activeDesk.working_hours[day]?.endTime)
                                    .hours} hrs</p>
                            </> : <div className='center-items'>
                                -
                            </div>}
                        </div>
                    })}
                    <div className='total_card'>
                        <p className="total_label text-center">Total hrs</p>
                        <p className="total text-center center-items">
                            {totalTime.hours} hrs
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DesksAndWorkingTimes