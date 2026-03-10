import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hook/reduxHooks";
import { setAuthUser } from "../../../redux/slices/authSlice";
import { getAuthUser } from "../../../services/authService";
import Spinner from "../../loading/Spinner";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  //get auth user
  useEffect(() => {
    async function fetchData() {
      try {
        //call api
        const user = await getAuthUser();

        //dispatch user
        dispatch(setAuthUser(user));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  //show loading until get auth user
  return isLoading ? (
    <div className="flex h-screen items-center justify-center dark:bg-primary-dark-bg">
      <Spinner size="50" showOverlay={false} color="blue" />
    </div>
  ) : (
    children
  );
}
