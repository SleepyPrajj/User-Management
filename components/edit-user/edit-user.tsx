"use client"
import React, { useState, useEffect, FormEvent } from 'react';
import styles from '@/lib/actions/addUser.module.css';
import { getUserById,updateUser } from '@/lib/actions/update';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Tenant = {
  tenantName: string;
  role: string;
};

interface User {
  name: string;
  PropertyName: string;
  image:string;
  tenants:Tenant;
  email: string;
}

const EditUserPage= () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const router = useSearchParams();
  const id  = router.get("id");
  const navigator=useRouter()
  // const pathname=usePathna me();
  // console.log(pathname)
  // no need to fetch old data as you might now what to changes
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (typeof id === 'string') {
  //       const userData = await getUserById(id);
  //       if (userData) {
  //         const plainUserData: User = JSON.parse(JSON.stringify(userData));
  //         setUser(plainUserData);
  //         // Update tenants state only when userData is available
  //         // setTenants(plainUserData.tenants);
  //       }
  //     }
  //   };
  
  //   fetchUserData();
  
  // }, );
  
  // console.log(user)
  // setTenants(user?.tenants);

  // console.log(user)
  const handleTenantChange = (index: number, field: keyof Tenant, value: string) => {
    const newTenants = tenants.map((tenant, tenantIndex) =>
      index === tenantIndex ? { ...tenant, [field]: value } : tenant
    );
    setTenants(newTenants);
  };

  const handleAddTenantField = () => {
    setTenants([...tenants, { tenantName: '', role: 'user' }]);
  };

  const handleRemoveTenantField = (index: number) => {
    setTenants(tenants.filter((_, tenantIndex) => index !== tenantIndex));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('email', email);
    formData.append('name', name);
    const sendTen=JSON.stringify(tenants);
    formData.append('tenants', sendTen);

    try {
      // console.log(formData)
      await updateUser( id!,formData);
      navigator.push("/admin")
    } catch (error:any) {
      console.error('Failed to update user:', error.message);
    }
  };

  return (
    <section className="mt-24 flex-col justify-center items-center p-16">
      <h1>Update user details  </h1>
      <div className={styles.container}>
      
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name Field */}
          <div className="max-w-sm">
            <label htmlFor="name-input" className="block text-sm font-medium mb-2 dark:text-white">
    Name
            </label>
            <input
              type="text"
              id="name-input"
              name="name"
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              placeholder="Change Name"
              // placeholder={user?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="max-w-sm">
            <label htmlFor="email-input" className="block text-sm font-medium mb-2 dark:text-white">
    Email
            </label>
            <input
              type="email"
              id="email-input"
              name="email"
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              placeholder="Change Email"
              // placeholder={user?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="max-w-sm">
            <label htmlFor="password-input" className="block text-sm font-medium mb-2 dark:text-white">
    Password (Leave blank to keep unchanged)
            </label>
            <input
              type="password"
              id="password-input"
              name="password"
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              placeholder="********"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Tenant Fields */}
          {tenants.map((tenant, index) => (
            <div key={index} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Tenant Name"
                value={tenant.tenantName}
                onChange={(e) => handleTenantChange(index, 'tenantName', e.target.value)}
                className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              />
              <input
                type="text"
                placeholder="Role"
                value={tenant.role}
                onChange={(e) => handleTenantChange(index, 'role', e.target.value)}
                className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              />
              {tenants.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTenantField(index)}
                  className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-orange-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                >
        Remove Tenant
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddTenantField}
            className="cursor-pointer transition-all bg-green-500 text-white px-6 py-2 rounded-lg border-teal-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mt-4"
          >
  Add Tenant
          </button>

          {/* Submit Button */}
          <button
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mt-4"
            type="submit"
          >
  Update User
          </button>
        </form>
      </div>
    </section>
  );
};
export default EditUserPage;
