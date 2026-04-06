"use client";

import { useState } from "react";
import { User, Edit2, Save, X } from "lucide-react";

export default function ProfileSection({ profile: initialProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setIsEditing(false);
  };

  return (
    <section id="profile" className="pb-10">
      <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-10 flex-wrap">
          <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center border border-border group overflow-hidden">
            <User size={32} className="text-secondary group-hover:text-primary transition-colors" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-2xl font-bold tracking-tight">Account Details</h2>
            <p className="text-secondary text-sm font-medium mt-1">View and manage your personal information.</p>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)} 
                className="btn btn-secondary gap-2 px-6"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSave} 
                  className="btn btn-primary gap-2 px-6"
                >
                  <Save size={16} />
                  Save
                </button>
                <button 
                  onClick={handleCancel} 
                  className="btn btn-secondary gap-2 px-6"
                >
                  <X size={16} />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Full Name</label>
            {isEditing ? (
              <input name="name" value={profile.name} onChange={handleChange} className="input-field" />
            ) : (
              <p className="text-lg font-semibold">{profile.name}</p>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Email Address</label>
            {isEditing ? (
              <input name="email" value={profile.email} onChange={handleChange} type="email" className="input-field" />
            ) : (
              <p className="text-lg font-semibold">{profile.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Phone Number</label>
            {isEditing ? (
              <input 
                name="phone" 
                value={profile.phone || ""} 
                onChange={handleChange} 
                className="input-field"
                placeholder="+1 234 567 890"
              />
            ) : (
              <p className="text-lg font-semibold">{profile.phone || "Not provided"}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Member Since</label>
            <p className="text-lg font-semibold">{profile.memberSince}</p>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Full Address</label>
            {isEditing ? (
              <textarea 
                name="address" 
                value={profile.address || ""} 
                onChange={handleChange} 
                rows={3}
                className="w-full rounded-xl border border-border bg-surface p-4 focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium text-sm"
                placeholder="Enter your full address..."
              />
            ) : (
              <p className="text-lg font-semibold">{profile.address || "No address added yet."}</p>
            )}
          </div>
        </div>
        
        {!isEditing && (
          <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
            <p className="text-xs text-secondary font-medium italic">
              Last updated: {new Date().toLocaleDateString()} • Verified Customer
            </p>
            <span className="px-3 py-1 bg-surface text-[10px] font-bold text-primary rounded-full uppercase tracking-widest border border-border">
              {profile.status}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
