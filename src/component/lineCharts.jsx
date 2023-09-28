import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceArea
} from "recharts";

import styled from "styled-components";





/**
 * Generate LineCharts with user data
 * @return { ReactElement }
 */


export default function Durée() {





    const data = [
        { data: '1', sessionLength: 0 },
        { data: '2', sessionLength: 300 },
        { data: '3', sessionLength: 600 },
        { data: '4', sessionLength: 800 },
        { data: '5', sessionLength: 1500 },
        { data: '6', sessionLength: 2000 },
        { data: '7', sessionLength: 2400 },
    ]




    // Return LineChart component
    return (
        <LineChart width={450} height={250} data={data}
            margin={{ top: 5, right: 12, left: 12, bottom: 5 }} style={{ background: 'rgb(255,255,255, 0.2)', borderRadius: 10, margin: '50px', boxShadow: '0px 0px 10px 0px rgba(255,255,255,0.75)' }}>
            <text
                x='7%'
                y='10%'
                dy={+10}
                style={{ fontSize: 15, fill: 'white' }}
            >
                Transaction History last 14 days
            </text>
            <XAxis tickLine={false} axisLine={false} dataKey='data' style={{ fontSize: 12, fill: '#FFFFFF' }} />
            <YAxis tickLine={false} axisLine={false} hide={true} padding={{ top: 70 }} />
            <Line type="monotone" dataKey="sessionLength" stroke="white" legendType="none" />
            <ReferenceArea />
        </LineChart>
    )
}