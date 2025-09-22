"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { CustomerProfile } from "@/components/customer/customer-profile"
import { CustomerOrders } from "@/components/customer/customer-orders"
import { CustomerVouchers } from "@/components/customer/customer-vouchers"

export default function CustomerPage() {
  const [activeSection, setActiveSection] = useState("profile")

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <CustomerProfile />
      case "orders":
        return <CustomerOrders />
      case "vouchers":
        return <CustomerVouchers />
      default:
        return <CustomerProfile />
    }
  }

  return (
    <CustomerLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderContent()}
    </CustomerLayout>
  )
}
