import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LoadingProvider } from '../hooks/useLoading'
import { LocationProvider } from '../hooks/useLocations'
import { UserProfileProvider } from '../hooks/useUserProfile'

import AuthenticatedLayout from './AuthenticatedLayout/AuthenticatedLayout'
import UnauthenicatedLayout from './UnauthenticatedLayout/UnauthenticatedLayout'

import Dashboard from './Dashboard/Dashboard'
import ResetPassword from './ResetPassword/ResetPassword'
import SignIn from './SignIn/SignIn'
import PasswordResetCode from './PasswordResetCode/PasswordResetCode'
import CreateNewPassword from './CreateNewPassword/CreateNewPassword'
import CanViewCustomers from './Customers/CanViewCustomers'
import GetCustomers from './Customers/GetCustomers/GetCustomers'
import PasswordCreatedSuccessfully from './PasswordCreatedSuccessfully/PasswordCreatedSuccessfully'
import CanViewPayments from './VirtualTerminal/CanViewPayments'
import VirtualTerminal from './VirtualTerminal/VirtualTerminal'
import CanViewReports from './Reports/CanViewReports'
import TransactionsReport from './Reports/Transactions/Transactions'
import BatchesReport from './Reports/Batches/Batches'
import DepositsReport from './Reports/Deposits/Deposits'
import ACHRejects from './Reports/ACHRejects/ACHRejects'
import RecurringBillingDeclinesReport from './Reports/RecurringBillingDeclines/RecurringBillingDeclines'
import Chargebacks from './Reports/Chargebacks/Chargebacks'
import PaymentConfirmation from './PaymentProcessed/PaymentConfirmation/PaymentConfirmation'
import { NewCustomer } from './Customers/NewCustomer/NewCustomer'
import { EditCustomer } from './Customers/EditCustomer/EditCustomer'
import ViewCustomer from './Customers/ViewCustomer/ViewCustomer'
import { NotFound } from '../components/RouteUnavailable/RouteUnavailable'

export default function Pages() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <Routes>
          <Route
            path="/"
            element={
              <UserProfileProvider>
                <LocationProvider>
                  <AuthenticatedLayout />
                </LocationProvider>
              </UserProfileProvider>
            }
          >
            <Route path="payments" element={<CanViewPayments />}>
              <Route path="virtual-terminal" element={<VirtualTerminal />} />
              <Route
                path="confirmation/:transactionId"
                element={<PaymentConfirmation />}
              />
            </Route>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<CanViewReports />}>
              <Route path="transactions" element={<TransactionsReport />} />
              <Route path="batches" element={<BatchesReport />} />
              <Route path="deposits" element={<DepositsReport />} />
              <Route path="ach-rejects" element={<ACHRejects />} />
              {/* 
                // TODO removed for MVP
                <Route path="chargebacks" element={<Chargebacks />} /> 
              */}
              <Route
                path="recurring-billing-declines"
                element={<RecurringBillingDeclinesReport />}
              />
            </Route>
            <Route path="customers" element={<CanViewCustomers />}>
              <Route path="new" element={<NewCustomer />} />
              <Route path="edit/:customerId" element={<EditCustomer />} />
              <Route path="view/:customerId" element={<ViewCustomer />} />
              <Route
                path="confirmation/:transactionId"
                element={<PaymentConfirmation />}
              />
              <Route path="" element={<GetCustomers />} />
            </Route>
            <Route index element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="signin" element={<UnauthenicatedLayout />}>
            <Route path="forgot-password" element={<ResetPassword />} />
            <Route path="enter-code" element={<PasswordResetCode />} />
            <Route path="change-password" element={<CreateNewPassword />} />
            <Route
              path="change-successful"
              element={<PasswordCreatedSuccessfully />}
            />
            <Route index element={<SignIn />} />
          </Route>
        </Routes>
      </LoadingProvider>
    </BrowserRouter>
  )
}
