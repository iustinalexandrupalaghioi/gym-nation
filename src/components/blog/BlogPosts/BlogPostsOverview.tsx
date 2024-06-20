import React from "react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import BlogOverviewCard from "./BlogOverviewCard";
import BlogOverviewSkeleton from "./BlogOverviewSkeleton";
import ErrorPage from "../../../pages/Client/ErrorPage";

import LoadingStatus from "../../LoadingStatus";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteFetchPosts from "../../../hooks/useInfiniteFetchPosts";

const BlogPostsOverview = () => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteFetchPosts();

  if (error) {
    console.error("Firestore error:", error);
    return <ErrorPage />;
  }

  if (isLoading && !data) {
    return (
      <div className="col-12 col-md-6 col-lg-8">
        {[...Array(5)].map((_, index) => (
          <BlogOverviewSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="col-12 col-md-6 col-lg-8">
      <InfiniteScroll
        dataLength={
          data?.pages.reduce((acc, page) => acc + page.posts.length, 0) || 0
        }
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<LoadingStatus />}
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.posts.map((doc: QueryDocumentSnapshot<DocumentData>) => (
              <BlogOverviewCard post={doc} key={doc.id} />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && (
          <React.Fragment>
            {[...Array(5)].map((_, index) => (
              <BlogOverviewSkeleton key={index} />
            ))}
          </React.Fragment>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default BlogPostsOverview;
