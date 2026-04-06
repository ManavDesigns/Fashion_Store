import Button from "../common/Button";

export default function Newsletter() {
  return (
    <section className="section-padding bg-surface border-t border-border/40">
      <div className="site-container flex flex-col items-center text-center gap-12 lg:gap-16">
        {/* Branding & Icon */}
        <div className="relative group">
          <div className="w-12 h-12 flex items-center justify-center border border-primary/20 rounded-full mb-8 relative z-10 transition-transform duration-700 group-hover:rotate-180">
            <span className="w-1 h-3 bg-primary absolute" />
            <span className="w-3 h-1 bg-primary absolute" />
          </div>
          <div className="absolute inset-0 bg-primary/5 rounded-full scale-150 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
        </div>

        <div className="max-w-[720px] px-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-6">
            Personal Atelier
          </h2>
          <p className="text-secondary text-[11px] md:text-xs font-black uppercase tracking-[0.25em] leading-relaxed max-w-lg mx-auto opacity-70">
            Subscribe to receive early access to our private collections and seasonal lookbooks curated by our lead designers.
          </p>
        </div>

        <form className="flex flex-col sm:flex-row gap-0 w-full max-w-xl px-4 group">
          <input 
            type="email" 
            placeholder="YOUR EMAIL ADDRESS" 
            className="flex-1 h-14 bg-white px-10 border border-border border-r-0 focus:outline-none focus:border-primary transition-all font-black text-[10px] uppercase tracking-[0.2em] shadow-sm"
            required
          />
          <Button 
            type="submit" 
            variant="primary" 
            className="h-14 px-12 shadow-xl shadow-black/10 hover:shadow-black/20"
          >
            Join
          </Button>
        </form>
        
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/30 mt-4 opacity-50">
          Privacy Policy • Terms of Service • Cookie Policy
        </p>
      </div>
    </section>
  );
}
