import useCustomersSubcription from "../../hooks/useCustomersSubscriptions";

const CustomersTable = () => {
  const { data: customers, isLoading } = useCustomersSubcription();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Stripe ID</th>
          <th>Email</th>
          <th>Start</th>
          <th>End</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.data.email}</td>
            <td>
              {customer.subscriptions && customer.subscriptions.length > 0
                ? "Yes"
                : "No"}
            </td>
            <td className="text-primary">
              {customer.subscriptions &&
                customer.subscriptions.length > 0 &&
                customer.subscriptions[0].subscriptionStatus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomersTable;
