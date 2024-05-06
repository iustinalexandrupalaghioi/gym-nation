import useMuscles from "./useMuscles";

const useMuscle = (slug: string) => {
  const { data } = useMuscles();
  return data?.result.find((m) => m.data().slug === slug);
};
export default useMuscle;
