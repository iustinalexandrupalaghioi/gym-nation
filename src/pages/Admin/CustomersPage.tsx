import LoadingStatus from "../../components/LoadingStatus";
import PageContent from "../../components/dashboard/PageContent";
import Table from "../../components/dashboard/Table";
import useCustomers from "../../hooks/useCustomers";
import ErrorPage from "../Client/ErrorPage";

const CustomersPage = () => {
  const { data: customers, isLoading, error } = useCustomers();

  if (error) return <ErrorPage />;

  if (isLoading) return <LoadingStatus />;
  return (
    <PageContent pageTitle="Clienți">
      <Table customers={customers?.result} />
    </PageContent>
  );
};

export default CustomersPage;
