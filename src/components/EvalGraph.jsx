import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import useGameStore from '../store/gameStore.js'

const EvalGraph = () => {
  const { evals, moveIndex } = useGameStore()
  const data = evals.map((evalScore, index) => ({
    move: index,
    eval: evalScore,
    highlighted: index === moveIndex
  }))

  return (
    <div className="h-48 bg-gray-900/50 rounded-2xl border border-gray-700 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
          <defs>
            <linearGradient id="evalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="gray" strokeOpacity={0.2} />
          <XAxis 
            dataKey="move" 
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'white', fontSize: 10 }}
            tickFormatter={(value) => Math.floor(value / 2) + 1}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'white', fontSize: 10 }}
            tickFormatter={(value) => value.toFixed(1)}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ background: 'rgba(0,0,0,0.9)', border: '1px solid gray' }}
            labelFormatter={(value) => `Move ${Math.floor(value / 2) + 1}`}
          />
          <Line 
            type="monotone" 
            dataKey="eval" 
            stroke="url(#evalGradient)" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 2, stroke: 'white' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EvalGraph

