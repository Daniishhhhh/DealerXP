import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    LogIn,
    UserPlus,
    Lock,
    Building2,
    Mail,
    User
} from "lucide-react";

import {
    login,
    registerUser
} from "../../api/client";

export function LoginForm({ onLogin }) {
        const [activeTab, setActiveTab] = useState("signin");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ---------- Sign In ----------
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");

    // ---------- Sign Up ----------
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupDepartment, setSignupDepartment] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [departments, setDepartments] = useState([]);

    useEffect(() => {

        async function loadDepartments() {

            try {

                const res = await fetch(
                    "http://127.0.0.1:8000/api/v1/leaderboard?scope=department"
                );

                const data = await res.json();

                setDepartments(
                    (data.leaderboard || []).map(x => x.name)
                );

            } catch (err) {

                console.error(err);

            }

            setLoading(false);
        }

        loadDepartments();

    }, []);

    async function handleSignIn(e) {

        e.preventDefault();

        setError("");

        try {

            const result = await login(
                employeeId,
                password
            );

            localStorage.setItem(
                "dealerxp_user_id",
                result.user_id
            );

            onLogin(result.user_id);

        } catch (err) {

            setError("Invalid Employee ID or Password");

        }

    }

    async function handleSignUp(e) {

        e.preventDefault();

        setError("");

        if (signupPassword !== confirmPassword) {

            setError("Passwords do not match");

            return;

        }

        try {

            const result = await registerUser({

                name: signupName,

                email: signupEmail,

                department: signupDepartment,

                password: signupPassword

            });

            localStorage.setItem(
                "dealerxp_user_id",
                result.employee_id
            );

            onLogin(result.employee_id);

        }

        catch {

            setError("Registration failed");

        }

    }



    if (loading) {

        return (

            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">

                <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-5"/>

                <p>Loading employees...</p>

            </div>

        );

    }

    return (

        <motion.div

            initial={{opacity:0,y:30}}

            animate={{opacity:1,y:0}}

            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"

        >

            <div className="h-2 bg-gradient-to-r from-blue-600 via-slate-500 to-orange-500"/>

            <div className="p-8">

                <h1 className="text-4xl font-bold text-center">

                    DealerXP Portal

                </h1>

                <p className="text-center text-gray-500 mt-2">

                    Gamified Dealership Performance

                </p>

                <div className="mt-8 flex rounded-xl bg-gray-100 p-1">

                    <button

                        onClick={()=>setActiveTab("signin")}

                        className={`flex-1 py-2 rounded-lg transition ${
                            activeTab==="signin"
                            ? "bg-white shadow text-blue-600"
                            : ""
                        }`}

                    >

                        Sign In

                    </button>

                    <button

                        onClick={()=>setActiveTab("signup")}

                        className={`flex-1 py-2 rounded-lg transition ${
                            activeTab==="signup"
                            ? "bg-white shadow text-blue-600"
                            : ""
                        }`}

                    >

                        Sign Up

                    </button>

                </div>

                               {activeTab === "signin" && (

<form
    onSubmit={handleSignIn}
    className="mt-8 space-y-5"
>

    <div>

        <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
            Employee ID
        </label>

        <div className="relative">

            <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"/>

            <input
                type="text"
                value={employeeId}
                onChange={(e)=>setEmployeeId(e.target.value)}
                placeholder="BAA6879"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                required
            />

        </div>

    </div>

    <div>

        <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
            Password
        </label>

        <div className="relative">

            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"/>

            <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                required
            />

        </div>

    </div>

    {error && (

        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 text-sm">

            {error}

        </div>

    )}

    <button
        type="submit"
        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 transition"
    >

        <LogIn className="w-5 h-5"/>

        Sign In

    </button>

</form>

)}

{activeTab === "signup" && (

<form
    onSubmit={handleSignUp}
    className="mt-8 space-y-5"
>

    <div>

        <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
            Full Name
        </label>

        <div className="relative">

            <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"/>

            <input
                type="text"
                value={signupName}
                onChange={(e)=>setSignupName(e.target.value)}
                placeholder="Enter full name"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                required
            />

        </div>

    </div>

    <div>

        <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
            Email
        </label>

        <div className="relative">

            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"/>

            <input
                type="email"
                value={signupEmail}
                onChange={(e)=>setSignupEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                required
            />

        </div>

    </div>

    <div>

        <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
            Department
        </label>

        <div className="relative">

            <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"/>

            <select
                value={signupDepartment}
                onChange={(e)=>setSignupDepartment(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                required
            >

                <option value="">
                    Select Department
                </option>

                {departments.map((dept)=>(
                    <option
                        key={dept}
                        value={dept}
                    >
                        {dept}
                    </option>
                ))}

            </select>

        </div>

    </div>

    <div>

        <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
            Password
        </label>

        <div className="relative">

            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"/>

            <input
                type="password"
                value={signupPassword}
                onChange={(e)=>setSignupPassword(e.target.value)}
                placeholder="Create password"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                required
            />

        </div>

    </div>

    <div>

        <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
            Confirm Password
        </label>

        <div className="relative">

            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"/>

            <input
                type="password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                required
            />

        </div>

    </div>

    {error && (

        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 text-sm">

            {error}

        </div>

    )}

    <button
        type="submit"
        className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center gap-2 transition"
    >

        <UserPlus className="w-5 h-5"/>

        Create Account

    </button>

</form>)

}








            </div>

        </motion.div>

    




);
}
