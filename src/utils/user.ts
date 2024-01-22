import { useHttp, useMount } from "@/hooks/customHook";
import { useAsync } from "@/hooks/use-async";
import { User } from "@/screens/project-list/search-panel";
import { cleanObject } from ".";

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<User[]>();
    useMount(() => {
        run(client('users', {
            data: cleanObject(param || {})
        }))  
    });
    return result;
}