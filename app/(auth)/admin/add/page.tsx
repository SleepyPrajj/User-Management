
"use client"
import React, { useState, FormEvent } from 'react';
import { addUser } from '@/lib/actions/add';
import styles from '@/lib/actions/addUser.module.css';
import { FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
type Tenant = {
  tenantName: string;
  role: string;
};

const AddUserPage: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([{ tenantName: '', role: 'user' }]);
  const navigator=useRouter()
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
    const sendTen=JSON.stringify(tenants)
    formData.append('tenants',sendTen );
    try {
      await addUser(formData);
      navigator.push("/admin")
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <section className="mt-16 flex justify-center items-center p-16">
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="max-w-sm">
            <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name='email'
              id="input-label"
              required
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              placeholder="you@site.com"
            />
          </div>
          <div className="max-w-sm">
            <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">
              Name
            </label>
            <input
              type="text"
              name='name'
              id="input-label"
              required
              placeholder='Enter Name'
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
            />
          </div>
          <div className="max-w-sm">
            <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name='password'
              id="input-label"
              required
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              placeholder="********"
            />
          </div>
          {tenants.map((tenant, index) => (
            <div key={index} className="flex-col gap-4">
              <input
                type="text"
                placeholder="Tenant Name"
                value={tenant.tenantName}
                onChange={(e) => handleTenantChange(index, 'tenantName', e.target.value)}
                required
                className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              />
              <input
                type="text"
                placeholder="Role"
                // value={tenant.role}
                onChange={(e) => handleTenantChange(index, 'role', e.target.value)}
                className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              />
              {tenants.length > 1 && (
                <button type="button" onClick={() => handleRemoveTenantField(index)}
                  className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-orange-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                >
                  Remove Tenant
                </button>
              )}
            </div>

          ))}
          <button type="button" onClick={handleAddTenantField} className="cursor-pointer transition-all bg-green-500 text-white px-6 py-2 rounded-lg border-teal-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          >
            Add Tenant
          </button>

          <button
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            type="submit"
          >
            Add User
          </button>
          <Link href="/admin">
            <button
              className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-amber-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              
            >
           Cancel
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default AddUserPage;
