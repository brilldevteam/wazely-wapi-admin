export const paymentColumns = [
    { id: "invoice_number", label: "Invoice", isVisible: true, key: "invoice_number" },
    { id: "transaction_id", label: "Transaction ID", isVisible: true, key: "transaction_id" },
    { id: "user", label: "User", isVisible: true, key: "user.name" },
    { id: "user_email", label: "Email", isVisible: true, key: "user.email" },
    { id: "plan", label: "Plan", isVisible: true, key: "plan.name" },
    { id: "amount", label: "Amount", isVisible: true, key: "amount" },
    { id: "currency", label: "Currency", isVisible: true, key: "currency" },
    { id: "gateway", label: "Gateway", isVisible: true, key: "payment_gateway" },
    { id: "status", label: "Status", isVisible: true, key: "payment_status" },
    { id: "paid_at", label: "Paid At", isVisible: true, key: "paid_at" },
    { id: "actions", label: "Actions", isVisible: true, key: "actions" },
  ]