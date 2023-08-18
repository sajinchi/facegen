import Link from 'next/link';
import { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { UserGetService } from '@/services/user/usergetList.service';

import { IUserListData } from '@/types/IUserListData';

const UsersViewPage = () => {
    const [userList, setUserList] = useState<IUserListData[]>();
    const [start, setStart] = useState(0);
    const [end,setEnd] = useState(6);
  
    const getusers = async() => {
        let response = await UserGetService();
        if(response?.status == 200) {
            setUserList(response.data);
        }
    }
    useEffect(() => {
        getusers();
    }, []);


    const handlePrev = () =>{
        if(start > 0){
            setStart(start-6);
            setEnd(end-6);
        }
    }
    
    const handleNext = () =>{
        if(start < userList!.length!){
            setStart(start+6);
            setEnd(end+6);
        }
    }
    console.log(userList);
  return (
    <div>
      <table className="align-middle text-left w-full ">
        <thead>
          <tr className=" bg-white font-medium h-14 w-max dark:bg-tablecolor1">
            <th className="px-6 py-3">First Name</th>
            <th className="px-6 py-3">Last Name</th>
            <th className="px-6 py-3">UserName</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Is Active</th>
            <th className="px-6 py-3">Is Subscribed</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
            {userList?.slice(start,end).map((data, index) => {
                return (
                  <tr
                    key={index}
                    className="font-medium odd:bg-white even:dark:bg-tablecolor1 h-14"
                  >
                    <td className="px-6 py-3">{data.first_name}</td>
                    <td className="px-6 py-3">{data.last_name}</td>
                    <td className="px-6 py-3">{data.username}</td>
                    <td className="px-6 py-3">{data.email}</td>
                    <td className="px-6 py-3">
                      {Boolean(data.is_active == true) && <>Active</>}
                      {Boolean(data.is_active == false) && <>Not Active</>}
                    </td>
                    <td className="px-6 py-3">
                      {Boolean(data.is_subscribed == true) && <>Subscribed</>}
                      {Boolean(data.is_subscribed == false) && <>Not Subscribed</>}
                    </td>
                    <td className="px-6 py-3">
                      <span className="flex flex-row items-center space-x-3 text-xl">
                        <div>
                          <Link
                            href={{
                              pathname: "",
                              query: "id=",
                            }}
                          >
                            <button>
                              <AiOutlineEye />
                            </button>
                          </Link>
                        </div>
                      </span>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      <div className="flex items-center justify-center p-6">
        <button onClick={()=>handlePrev()} className="flex items-center justify-center rounded-md  h-9 w-28 hover:bg-slate-200">Previous <BiSkipPrevious className="text-3xl" /> </button>
        <button onClick={()=>handleNext()} className="flex items-center justify-center rounded-md h-9 w-28 hover:bg-slate-200" ><BiSkipNext className="text-3xl" />Next</button>
      </div>
    </div>
  )
}

export default UsersViewPage
