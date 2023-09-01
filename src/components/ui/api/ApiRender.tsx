export interface ApiRenderProps {
  success: React.ReactNode;
  error: React.ReactNode;
  loading: React.ReactNode;
  empty: React.ReactNode;
  status: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    isEmpty: boolean;
  };
}

function ApiRender({ empty, error, loading, status, success }: ApiRenderProps) {
  return (
    <>
      {status.isLoading && loading}
      {status.isError && error}
      {status.isEmpty && empty}
      {status.isSuccess && success}
    </>
  );
}

export default ApiRender;
