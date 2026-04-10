"use client";

import { useState } from "react";
import { User as UserIcon, Edit2, Save, X } from "lucide-react";

export default function ProfileSection({ profile: initialProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Implement API call to save profile here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(initialProfile || {});
    setIsEditing(false);
  };

  // If profile is not loaded, show a skeletal state or nothing
  if (!profile && !isEditing) return null;

  return (
    <section id="profile" className="fade-in">
      <div className="bg-white border border-border shadow-sm overflow-hidden">
        <div className="p-8 md:p-10 border-b border-border">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-surface flex items-center justify-center text-primary border border-border">
                <UserIcon size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary uppercase tracking-tight">Personal Profile</h2>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] opacity-60">Manage your account details</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="h-10 px-6 border border-border text-[9px] font-black uppercase tracking-widest hover:border-black transition-colors"
                >
                  Edit Details
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleSave} 
                    className="h-10 px-6 bg-black text-white text-[9px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={handleCancel} 
                    className="h-10 px-6 border border-border text-[9px] font-black uppercase tracking-widest hover:bg-surface transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">First Name</label>
              {isEditing ? (
                <input 
                  name="firstName" 
                  value={profile.firstName || ""} 
                  onChange={handleChange} 
                  className="w-full h-11 border border-border px-4 text-xs font-medium focus:outline-none focus:border-black transition-colors"
                  placeholder="First name"
                />
              ) : (
                <p className="text-sm font-bold text-primary">{profile.firstName || "—"}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">Last Name</label>
              {isEditing ? (
                <input 
                  name="lastName" 
                  value={profile.lastName || ""} 
                  onChange={handleChange} 
                  className="w-full h-11 border border-border px-4 text-xs font-medium focus:outline-none focus:border-black transition-colors"
                  placeholder="Last name"
                />
              ) : (
                <p className="text-sm font-bold text-primary">{profile.lastName || "—"}</p>
              )}
            </div>
            
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">Email Address</label>
              {isEditing ? (
                <input 
                  name="email" 
                  value={profile.email || ""} 
                  onChange={handleChange} 
                  type="email" 
                  className="w-full h-11 border border-border px-4 text-xs font-medium focus:outline-none focus:border-black transition-colors"
                  placeholder="email@example.com"
                />
              ) : (
                <p className="text-sm font-bold text-primary">{profile.email || "—"}</p>
              )}
            </div>

            {/* Created At */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">Member Since</label>
              <p className="text-sm font-bold text-primary">
                {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Joining Atelier...'}
              </p>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">Full Address</label>
              {isEditing ? (
                <textarea 
                  name="address" 
                  value={profile.address || ""} 
                  onChange={handleChange} 
                  rows={3}
                  className="w-full border border-border p-4 text-xs font-medium focus:outline-none focus:border-black transition-colors"
                  placeholder="Enter your street address, city, postcode..."
                />
              ) : (
                <p className="text-sm font-bold text-primary leading-relaxed">{profile.address || "No address on file."}</p>
              )}
            </div>
          </div>
        </div>

        {!isEditing && (
          <div className="p-8 md:p-10 bg-surface/50 border-t border-border flex items-center gap-4">
             <ShieldCheck size={16} className="text-primary opacity-60" />
             <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">
               Your information is secure and encrypted.
             </p>
          </div>
        )}
      </div>
    </section>
  );
}
