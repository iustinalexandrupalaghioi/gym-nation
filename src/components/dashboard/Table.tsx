import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

interface Props {
  customers: QueryDocumentSnapshot<DocumentData, DocumentData>[] | undefined;
}
const Table = ({ customers }: Props) => {
  return (
    <table className="table table-stripped mt-5">
      <thead>
        <tr>
          <th>Stripe ID</th>
          <th>Email</th>
          <th>Name</th>
          <th>Subscriber</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.data().stripeId}</td>
            <td>{customer.data().email}</td>
            <td>{customer.data().name}</td>
            <td>{customer.data().subscriptions ? "Yes" : "No"}</td>
            <td>{customer.data().subscriptions}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
