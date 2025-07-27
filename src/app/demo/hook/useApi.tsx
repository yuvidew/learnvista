import { useEffect, useState } from "react"
import { addEmployPropsType, getEmploysType } from "../types/type";
import axios from "axios";
import { toast } from "sonner";

const BASE_URL = "http://localhost:2000";


export const useAddNewEmploys = () => {
    const [loading , setLoading] = useState<boolean>(false);

    const onAddNewEmploy = async (values : addEmployPropsType) => {
        setLoading(true);

        try {
            const res = await axios.post(`${BASE_URL}/api/add-employs` , values);

            if(res.status !== 200){
                toast.error(res.data.message);
                return;
            }

            toast.success(res.data.message);

            return res.data.success

        } catch (error) {
            console.log("The Error from Add Employs" , error);
        }finally{
            setLoading(false)
        }
    }

    return {onAddNewEmploy , loading}
}

export const useGetEmploys = () => {
    const [loading , setLoading] = useState<boolean>(false);
    const [employs , setEmploys] = useState<getEmploysType[]>([]);

    const onGetEmploys = async () => {
        setLoading(false);

        try {
            const res = await axios.get(`${BASE_URL}/api/get-employs`);

            if(res.status !== 200){
                toast.error(res.data.message);
                return;
            }

            setEmploys(res.data.employs);

        } catch (error) {
            console.log("The Error from Add Employs" , error);
            setEmploys([]);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        onGetEmploys()
    } , [])

    return {onGetEmploys , loading , employs}
}
