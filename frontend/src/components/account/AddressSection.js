import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AddressSection({ addresses = [] }) {
  return (
    <section id="addresses" className="flex flex-col gap-8 py-12 border-t border-border/40 fade-in">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary">Saved Addresses</h2>
        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:opacity-70 transition-opacity">
          <Plus size={14} strokeWidth={3} />
          <span className="hidden sm:inline">Add New</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address, index) => (
          <article
            key={address.label}
            className={`group relative flex flex-col gap-4 p-8 border rounded-[24px] bg-white transition-all duration-300 ${index === 0 ? 'border-primary shadow-md' : 'border-border hover:border-primary/50 shadow-sm'}`}
          >
            {index === 0 && (
              <div className="absolute -top-3 left-8 bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                Primary
              </div>
            )}
            
            <div className="flex justify-between items-start">
               <strong className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">
                 {address.label}
               </strong>
               <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="text-secondary hover:text-primary transition-colors"><Edit2 size={14} /></button>
                 <button className="text-secondary hover:text-error transition-colors"><Trash2 size={14} /></button>
               </div>
            </div>

            <p className="text-sm font-medium text-secondary italic opacity-80 leading-relaxed mt-2">
              <span className="font-bold text-primary not-italic block mb-1">{address.name}</span>
              {address.line1}
              <br />
              {address.city}, {address.state}
              <br />
              {address.country} — {address.postcode}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
