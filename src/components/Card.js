import React from 'react';
import ReactApexChart from "react-apexcharts";

const Card = ({ user }) => {

    const series = [
        {
            name: "Conversions 4/12 - 4/30",
            type: "line",
            data: [
                [1, 0],
                [2, 10],
                [3, 8],
                [4, 7],
                [5, 10],
                [6, 11],
                [7, 7],
                [8, 7.5],
                [9, 9],
                [10, 8],
                [11, 7],
                [12, 11],
                [13, 10],
                [14, 4],
                [15, 9]
            ]
        }
    ];

    const options = {
        grid: {
            show: false
        },
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            title: 'Conversions 4/14 - 4/30'
        },
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        stroke: {
            show: true,
            width: 1
        },
        tooltip: {
            enabled: false
        }
    }

    return (
        <div className="border-4 rounded-lg border-black bg-white h-max w-[280px] p-3 tracking-tight">
            <div className='UserCard flex'>
                {
                    user.avatar ?
                        <img className='w-16 h-16' src={user.avatar} alt=""></img>
                        : <div className='rounded-full bg-sky-600 text-white text-center pt-2 text-[30px] w-16 h-16 '>{user.name[0]}</div>
                }
                <div className='font-bold p-1'>
                    <p className='name text-gray-700  text-lg'>
                        {user.name}
                    </p>
                    <p className="occupation text-xs text-gray-500 text-left pl-2 mt-[-5px]">{user.occupation}</p>
                </div>
            </div>
            <div className='flex justify-between items-end mt-[-30px]'>
                <div className='w-[60%] bottom-[-27px]'>
                    <ReactApexChart
                        options={options}
                        series={series}
                    />
                    <small className='text-center text-gray-500 absolute bottom-7 left-3 '>Conversions 4/14 - 4/30</small>
                </div>
                <div className="text-right flex flex-col align-bottom">
                    <div className="pb-2">
                        <p className="text-yellow-600 font-bold leading-[0px]">{user.impression}</p>
                        <small className="text-gray-400">impressions</small>
                    </div>
                    <div>
                        <p className="text-sky-600 font-bold leading-[0px]">{user.conversion}</p>
                        <small className="text-gray-400">conversions</small>
                    </div>
                    <p className='text-green-600 text-xl font-bold'>{user.revenue.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;