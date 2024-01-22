// import { ProjectList } from '@/screens/project-list'
import Unauthenticated from "@/unauthenticated-app"
import { useAuth } from "@/context/auth-context"
import Authenticated from "@/authenticated-app";
import { ErrorBoundary } from "@/components/error-boundary";
import { FullPageErrorFallback } from "./components/lib";



const App = () => {
  const {user} = useAuth();
  // return <ProjectList />
  
  return (
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <Authenticated/> : <Unauthenticated/>}
    </ErrorBoundary>
  )
}

export default App
