import useCustomersSubcription from "../../hooks/useCustomersSubscriptions";
import LoadingStatus from "../LoadingStatus";

const CustomersTable = () => {
  const { data: customers, isLoading } = useCustomersSubcription();

  if (isLoading) {
    return <LoadingStatus />;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Stripe ID</th>
          <th>Email</th>
          <th>Abonat</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer) => (
          <tr key={customer.id}>
            <td className="text-body-secondary">{customer.id}</td>
            <td className="text-body-secondary">{customer.data.email}</td>
            <td className="text-body-secondary">
              {customer.subscriptions && customer.subscriptions.length > 0
                ? "Da"
                : "Nu"}
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
