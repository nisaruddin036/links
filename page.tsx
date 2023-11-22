"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";


interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;

}

function Home() {
  const router = useRouter();
  const [data, setData] = useState<UserData[]>([]);
  const [records, setRecords] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get<UserData[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterRecords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    setRecords(
      data.filter( (f) =>
          f.name.toLowerCase().includes(inputValue) )
    );
  };


  const handleButtonClick = () => {
    router.push("/components/contacts/new");
  };
  

  return (
    <main>
      <div className="flex items-start space-x-4 py-2 ml-4 text-2xl">
        <h1>Contact Manager</h1>
        <button
          onClick={handleButtonClick}
          className="bg-green-300 hover:bg-green-400 rounded-lg ml-4">+new</button>
      </div>
      <div className="ml-4 text-xl">
        <p>Create a profile</p>
      </div>
      <div className="flex items-start space-x-4 py-2 ml-4 text-xl">
        <input type="text" className="form-control" onChange={filterRecords} placeholder="search" />
        <button>submit</button>
      </div>
      <section>
      <div className="grid grid-cols-3 gap-4 ml-4 ">
            {loading ? (
              <p>Loading...</p>
            ) : (
              records.map((d, i) => (
                <div key={i} className="bg-white my-2 rounded-lg ring-1">
                  <p className="p-1 ml-20">{d.id}</p>
                  <div className="links flex flex-row space-x-8">
                  <p className="p-1 ml-20">{d.name}</p>
                  <Link href={`/components/contacts/view?id=${d.id}`}>view</Link>
                  </div>
                  <div className="links flex flex-row space-x-8">
                  <p className="p-1 ml-20">{d.email}</p>
                  <Link href="/components/contacts/edit">edit</Link>
                  </div>
                  <p className="p-1 ml-20">{d.phone}</p>
                </div>
              ))
            )}
      </div>
    </section>
    </main>
  );
}

export default Home;
