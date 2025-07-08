import React from 'react'

const MemberModal = ({ selectedUser, closeModal, showModal }) => {
    if (!showModal || !selectedUser) return null;
    
    const formatName = (nameObj) => {
        const { firstname, middlename, lastname } = nameObj;
        return [firstname, middlename, lastname].filter(Boolean).join(' ');
    };
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeModal}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">Member Details</h3>
                    <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* User Profile Section */}
                    <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
                        <img
                            className="h-16 w-16 rounded-full object-cover border-2 border-gray-300"
                            src={selectedUser.image}
                            alt={formatName(selectedUser.name)}
                            onError={(e) => {
                                e.target.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                            }}
                        />
                        <div className="ml-4">
                            <h4 className="text-lg font-medium text-gray-900 capitalize">
                                {formatName(selectedUser.name)}
                            </h4>
                            <p className="text-sm text-gray-600 capitalize">{selectedUser.profession}</p>
                            <p className="text-sm text-gray-500">{selectedUser.email?.primary}</p>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h5 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                                Personal Information
                            </h5>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <p className="text-sm text-gray-900 capitalize">{selectedUser.DOB}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <p className="text-sm text-gray-900 capitalize">{selectedUser.gender}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                                <p className="text-sm text-gray-900 uppercase">{selectedUser.bloodGroup}</p>
                            </div>

                            {selectedUser.maritalInfo?.status && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                                    <p className="text-sm text-gray-900 capitalize">{selectedUser.maritalInfo.status}</p>
                                    {selectedUser.maritalInfo.spouseName && (
                                        <p className="text-xs text-gray-600">Spouse: {selectedUser.maritalInfo.spouseName}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h5 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                                Contact Information
                            </h5>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Primary Phone</label>
                                <p className="text-sm text-gray-900">{selectedUser.phone?.primary}</p>
                            </div>

                            {selectedUser.phone?.alternate && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Alternate Phone</label>
                                    <p className="text-sm text-gray-900">{selectedUser.phone.alternate}</p>
                                </div>
                            )}

                            {selectedUser.email?.alternate && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Alternate Email</label>
                                    <p className="text-sm text-gray-900">{selectedUser.email.alternate}</p>
                                </div>
                            )}
                        </div>

                        {/* Address Information */}
                        {(selectedUser.address?.residential || selectedUser.address?.office) && (
                            <div className="col-span-1 md:col-span-2 space-y-4">
                                <h5 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                                    Address Information
                                </h5>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedUser.address?.residential && (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h6 className="font-medium text-gray-900 mb-2">Residential Address</h6>
                                            <div className="text-sm text-gray-700 space-y-1">
                                                {selectedUser.address.residential.addressLine && (
                                                    <p>{selectedUser.address.residential.addressLine}</p>
                                                )}
                                                <p>
                                                    {[
                                                        selectedUser.address.residential.city,
                                                        selectedUser.address.residential.state,
                                                        selectedUser.address.residential.pincode
                                                    ].filter(Boolean).join(', ')}
                                                </p>
                                                {selectedUser.address.residential.phone && (
                                                    <p>Phone: {selectedUser.address.residential.phone}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {selectedUser.address?.office && (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h6 className="font-medium text-gray-900 mb-2">Office Address</h6>
                                            <div className="text-sm text-gray-700 space-y-1">
                                                {selectedUser.address.office.addressLine && (
                                                    <p>{selectedUser.address.office.addressLine}</p>
                                                )}
                                                <p>
                                                    {[
                                                        selectedUser.address.office.city,
                                                        selectedUser.address.office.state,
                                                        selectedUser.address.office.pincode
                                                    ].filter(Boolean).join(', ')}
                                                </p>
                                                {selectedUser.address.office.phone && (
                                                    <p>Phone: {selectedUser.address.office.phone}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="flex justify-end">
                        <button
                            onClick={closeModal}
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberModal