import { Helmet } from 'react-helmet-async'
import { MonthRevenueCard } from './card/month-revenue'
import { MonthOrdersAmountCard } from './card/month-orders-amount'
import { DayOrdersAmountCard } from './card/day-orders-amount'
import {
  MonthCanceledOrdersAmountCard,
} from './card/month-canceled-orders-amount'

export const Dashboard = () => (
  <>
    <Helmet title="Dashboard" />
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <MonthRevenueCard />
        <MonthOrdersAmountCard />
        <DayOrdersAmountCard />
        <MonthCanceledOrdersAmountCard />
      </div>
    </div>
  </>
)
