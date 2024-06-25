import axios from "axios";
import React, { useState } from "react";
import { FaRegBookmark, FaSpinner } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { API_ROUTE } from "../../apis/quranApi";

interface ProfileProps {
    user: string;
    email: string;
    deleteAccount: () => void
    loading: boolean
    errorMsg: string
}

const Profile: React.FC<ProfileProps> = ({ user, email, deleteAccount, loading, errorMsg }) => {
    const [isModal, setIsModal] = useState<boolean>(false);
   
   
    const showDeleteModal = () => {
        setIsModal(true);
    };

    const closeDeleteModal = () => {
        setIsModal(false);
    };

    return (
        <div className="relative flex flex-col gap-4 h-full pb-20 items-start mt-28 px-4 lg:px-32">
            {loading ? (
                <div className="flex flex-col gap-10 items-center justify-center h-full w-full">
                    <p className="italic">Deleting Account...</p>
                    <FaSpinner className="spin text-xl" />
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col text-lg">
                            <p className="font-bold">{user}</p>
                            <p className="text-gray-500">{email}</p>
                        </div>
                    </div>

                    <div className="w-full lg:text-xl pt-8">
                        <ul>
                            <li className="border-b-2 border-t-2 py-3 hover:bg-blue-50">
                                <Link to={"/bookmarks"} className="flex items-center gap-3 hover:text-blue-700">
                                    <FaRegBookmark /> Bookmarks
                                </Link>
                            </li>
                            <li className="border-b-2 py-3 hover:bg-blue-50">
                                <Link to={"/notes"} className="flex items-center gap-3 hover:text-blue-700">
                                    <TfiWrite /> Personal Notes
                                </Link>
                            </li>
                            <li className="border-b-2 py-3 hover:bg-blue-50">
                                <Link to={"/my-questions"} className="flex items-center gap-3 hover:text-blue-700">
                                    <TfiWrite /> View Questions
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="pt-10 flex items-center justify-center w-full">
                        <button
                            onClick={showDeleteModal}
                            className="bg-red-600 hover:bg-red-500 text-white rounded-lg py-3 lg:py-4 px-6 font-bold"
                        >
                            Delete Account
                        </button>
                    </div>
                    {isModal && (
                        <div className="z-10 fixed inset-0 bg-transparent flex items-center justify-center top-0 right-0 left-0 bottom-0 px-2 lg:px-0">
                            <div className="absolute inset-0 h-full w-full bg-black opacity-15"></div>
                            <div className="z-10 border-black flex flex-col gap-7 border px-4 lg:px-10 pb-8 bg-white dark:bg-[#232528] dark:border-white rounded-md items-center justify-center p-8">
                                <div className="text-red-500">{errorMsg}</div>
                                <p className="text-xl">Are you sure you want to delete account?</p>
                                <div className="flex gap-5">
                                    <button
                                        onClick={deleteAccount}
                                        className="bg-red-600 px-4 py-1 rounded-lg hover:bg-red-500 text-white"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={closeDeleteModal}
                                        className="bg-gray-800 px-4 py-1 rounded-lg hover:bg-gray-800 border"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;
