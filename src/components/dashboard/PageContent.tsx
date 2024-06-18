import { ReactNode } from "react";
import ToastAlert from "../ToastAlert";

interface Props {
  children: ReactNode;
  pageTitle: string;
}

const PageContent = ({ children, pageTitle }: Props) => {
  return (
    <main className="col-md-8 col-lg-9 col-xl-10 ms-sm-auto px-md-4">
      <ToastAlert />
      <h1 className="h2 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center text-center pt-3 pb-2 mb-3 border-bottom">
        {pageTitle}
      </h1>
      {children}
    </main>
  );
};

export default PageContent;
