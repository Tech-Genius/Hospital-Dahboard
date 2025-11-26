import React from 'react';
import { useHospitalStore } from '../store/useHospitalStore';
import RightDrawer from './UI/RightDrawer';
import { PiPhone } from 'react-icons/pi';
import { MdEmail } from 'react-icons/md';

const DetailSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-light mb-2">{title}</h3>
        <div className="text-sm text-text-muted">{children}</div>
    </div>
);

const HospitalDetail: React.FC = () => {
    const { selectedHospital, setSelectedHospital } = useHospitalStore();

    const handleClose = () => setSelectedHospital(null);

    const hospital = selectedHospital;

    const DetailRow: React.FC<{ label: string, value: string | number | null | undefined }> = ({ label, value }) => {
        if (!value) return null;

        return (
            <div className="grid justify-between py-1">
                <span className="text-text-muted">{label}:</span>
                <span className="text-white font-medium">{value}</span>
            </div>
        );
    };

    return (
        <RightDrawer
            isOpen={!!hospital}
            onClose={handleClose}
            widthClass="w-full md:w-96 lg:w-1/3"
        >
            <div className="flex justify-between mt-6 items-start  pb-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">{hospital?.hospitalName}</h2>

                    <div className="flex flex-wrap gap-6 text-sm">
                        <span className="mr-3 text-primary-accent flex gap-2 items-center"> <PiPhone/> {hospital?.phoneNumber || 'N/A'}</span>
                        <span className="text-primary-accent flex gap-2 items-center text-[#25CCD2]"><MdEmail className='text-white'/> {hospital?.hospitalEmail || 'N/A'}</span>
                    </div>
                </div>

                <button
                    onClick={handleClose}
                    className="text-text-muted curosr-pointer hover:text-white p-2 rounded-full hover:bg-surface-medium"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <div className="space-y-6">
                <DetailSection title="Overview">
                    <div className='border border-[#1F1F1F] p-2'>
                        <DetailRow label="Longitude" value={hospital?.longitude} />

                        <DetailRow label="Latitude" value={hospital?.latitude} />

                        <div className='flex w-[90%] justify-between'>
                            <DetailRow label="Country" value={hospital?.country} />
                            <DetailRow label="State" value={hospital?.state} />
                            <DetailRow label="Address" value={hospital?.address} />
                        </div>
                    </div>
                </DetailSection>

                <DetailSection title="About">
                    <div className='border border-[#1F1F1F] p-2'>
                        <p> Welcome to {hospital?.hospitalName || 'ABC Hospital'}, a premier center dedicated to delivering comprehensive healthcare to our community with compassion, expertise, and innovation. Since our founding, our mission has been to provide high-quality, patient-centered care that addresses both acute and long-term health needs for every individual who walks through our doors. Our hospital blends state-of-the-art facilities with a team of experienced physicians, nurses, and support staff—all committed to your well-being and recovery at every stage of life.</p>
                    </div>
                </DetailSection>

                <DetailSection title="Research and Innovation">
                    <div className='border border-[#1F1F1F] p-2'>
                        <p> As a forward-thinking institution, {hospital?.hospitalName || '[Hospital Name]'} invests in research and clinical trials to bring the latest medical breakthroughs to our patients. Our partnerships with research institutions and universities help us stay at the cutting edge of medicine, offering patients access to advanced treatment options and clinical trials where appropriate. By embracing innovation, we continuously seek better ways to diagnose, treat, and prevent illness.</p>
                    </div>
                </DetailSection>

                <DetailSection title="Patient-Centered Care">
                    <div className='border border-[#1F1F1F] p-2'>
                        <p>Our hospital is designed for comfort and convenience. Private patient rooms, attentive support services, and a healing environment help ensure faster recovery and a better overall experience. From streamlined appointment scheduling to on-site amenities such as a family lounge, cafeteria, and wellness programs, every aspect of our hospital is created with the patient and their family in mind.</p>
                    </div>
                </DetailSection>

            </div>
        </RightDrawer>
    );
};

export default HospitalDetail;