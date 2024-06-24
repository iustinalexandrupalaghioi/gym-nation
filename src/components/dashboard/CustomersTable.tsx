import { MdDeleteForever } from "react-icons/md";
import useCustomersSubcription from "../../hooks/useCustomersSubscriptions";
import LoadingStatus from "../LoadingStatus";
import FirebaseClient from "../../utilities/firebase-client";
import { queryClient } from "../../main";
import showToast, { Method } from "../../utilities/showToast";
const firebaseClient = new FirebaseClient("/customers");
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
          <th>Acțiuni</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer) => (
          <tr key={customer.id}>
            <td className="text-body-secondary">{customer.id}</td>
            <td className="text-body-secondary">{customer.data.email}</td>
            <td>
              {customer.subscriptions && customer.subscriptions.length > 0
                ? "Da"
                : "Nu"}
            </td>
            <td className="text-primary">
              {customer.subscriptions &&
                customer.subscriptions.length > 0 &&
                customer.subscriptions[0].subscriptionStatus}
            </td>
            <td className="d-flex gap-2">
              <button
                className="btn btn-outline-danger d-inline-flex justify-content-center align-items center"
                onClick={async () => {
                  const allSubscriptionsInactive =
                    customer.subscriptions?.every(
                      (sub) => sub.subscriptionStatus === "inactive"
                    );
                  if (
                    (customer.subscriptions &&
                      customer.subscriptions.length == 0) ||
                    allSubscriptionsInactive
                  ) {
                    const result = await firebaseClient.delete(customer.docId);
                    if (result) {
                      queryClient.invalidateQueries({
                        queryKey: ["customers-subscriptions"],
                      });
                      showToast(
                        "Clientul a fost șters definitiv.",
                        Method.Success
                      );
                    } else {
                      showToast("Clientul nu poate fi șters", Method.Error);
                    }
                  } else {
                    showToast("Clientul nu poate fi șters", Method.Error);
                  }
                }}
              >
                <MdDeleteForever />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomersTable;
