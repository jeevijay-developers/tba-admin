'use client';

import React, { useState, useEffect } from 'react';
import { userService } from '../server/service';
import MemberModal from './MemberModal';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { HiUserGroup } from "react-icons/hi";

const Members = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [bulkApprovalStatus, setBulkApprovalStatus] = useState(false);

    // Fetch users from API
    const fetchUsers = async (page = 1, limit = usersPerPage) => {
        try {
            setLoading(true);
            const data = await userService.getUsers(page, limit);
            setUsers(data || []);
            setError(null);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(error.message || 'Failed to load users. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage, usersPerPage);
    }, [currentPage, usersPerPage]);

    // Update bulk approval status based on users
    useEffect(() => {
        if (users.length > 0) {
            const allApproved = users.every(user => user.approve);
            setBulkApprovalStatus(allApproved);
        }
    }, [users]);

    // Handle bulk approve/reject all toggle
    const handleBulkApprovalToggle = async () => {
        try {
            if (bulkApprovalStatus) {
                // If all are currently approved, reject all
                await userService.rejectAllUsers();
                setUsers(users.map(user => ({ ...user, approve: false })));
                setBulkApprovalStatus(false);
            } else {
                // If not all are approved, approve all
                await userService.approveAllUsers();
                setUsers(users.map(user => ({ ...user, approve: true })));
                setBulkApprovalStatus(true);
            }
            setError(null);
        } catch (error) {
            console.error('Error updating bulk approval status:', error);
            setError(error.message || 'Failed to update all users status. Please try again.');
        }
    };

    // Handle approve/reject toggle
    const handleApprovalToggle = async (userId, currentStatus) => {
        try {
            if (currentStatus) {
                await userService.rejectUser(userId);
            } else {
                await userService.approveUser(userId);
            }

            // Update local state
            setUsers(users.map(user =>
                user._id === userId ? { ...user, approve: !currentStatus } : user
            ));
            setError(null);
        } catch (error) {
            console.error('Error updating user approval status:', error);
            setError(error.message || 'Failed to update user status. Please try again.');
        }
    };

    // Handle info modal
    const handleInfoClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    // Pagination handlers
    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const formatName = (nameObj) => {
        const { firstname, middlename, lastname } = nameObj;
        return [firstname, middlename, lastname].filter(Boolean).join(' ');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className='flex items-center justify-between mb-6'>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Members Management</h1>
                        <p className="text-gray-600">Manage member accounts and their approval status</p>
                    </div>
                    <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={bulkApprovalStatus}
                                onChange={handleBulkApprovalToggle}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-700">
                                {bulkApprovalStatus ? 'Reject All Users' : 'Approve All Users'}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Members Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Member
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Profession
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img
                                                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                                                        src={user.image}
                                                        alt={formatName(user.name)}
                                                        onError={(e) => {
                                                            e.target.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                                                        }}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 capitalize">
                                                        {formatName(user.name)}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.email?.primary}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 capitalize">{user.profession}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.phone?.primary}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={user.approve}
                                                    onChange={() => handleApprovalToggle(user._id, user.approve)}
                                                />
                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 w-16">
                                                    {user.approve ? 'Approved' : 'Pending'}
                                                </span>
                                            </label>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handleInfoClick(user)}
                                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                            >
                                                <IoInformationCircleOutline size={16} />
                                                Info
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {users.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <HiUserGroup size={48} className="mx-auto text-black/60" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No members found</h3>
                            <p className="mt-1 text-sm text-gray-500">No members have been registered yet.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {users.length > 0 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextPage}
                                disabled={users.length < usersPerPage}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing page <span className="font-medium">{currentPage}</span>
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <MdKeyboardArrowLeft size={20} />
                                    </button>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={users.length < usersPerPage}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <MdKeyboardArrowRight size={20} />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* User Details Modal */}
            <MemberModal 
                selectedUser={selectedUser}
                closeModal={closeModal}
                showModal={showModal}
            />
        </div>
    );
};

export default Members;