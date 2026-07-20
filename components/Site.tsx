"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Menu, X } from "lucide-react";

const caption = "Conceptual illustration shown for explanatory purposes. It does not represent the product interface or customer data.";
const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: .65 } };

function Logo() {
  return <a href="#top" className="flex items-center gap-3 font-semibold tracking-tight" aria-label="Klaropoint home">
    <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-ink text-white shadow-soft">
      <span className="h-3.5 w-3.5 rotate-45 rounded-[4px] border border-white/80" />
      <span className="absolute h-1.5 w-1.5 rounded-full bg-[#8ed2c8]" />
    </span>
    <span className="text-[1.05rem]">Klaropoint</span>
  </a>;
}

function Button({ href, children, secondary=false }: { href:string; children:React.ReactNode; secondary?:boolean }) {
  return <a href={href} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${secondary ? "border border-slate-200 bg-white text-ink hover:border-slate-300" : "bg-ink text-white shadow-lg shadow-slate-900/10 hover:bg-[#252936]"}`}>{children}<ArrowRight size={16}/></a>;
}

function Pipeline({ compact=false }: { compact?: boolean }) {
  const steps = compact ? ["Practice systems","Secure processing","Integrity services","Reporting & visibility"] : ["Clinical systems","Secure intake","Integrity review","Reconciliation","Audit documentation","Operational visibility"];
  return <div className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-white/80 p-5 shadow-soft sm:p-8">
    <div className="absolute inset-0 grid-fade opacity-70" />
    <div className={`relative grid ${compact ? "md:grid-cols-4" : "md:grid-cols-6"} gap-3`}>
      {steps.map((step,i)=><div key={step} className="relative">
        <motion.div animate={{ y:[0,-4,0] }} transition={{ duration:4+i*.25, repeat:Infinity, ease:"easeInOut" }} className="relative z-10 flex min-h-28 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 text-center text-sm font-semibold shadow-sm">
          <span className="absolute left-4 top-4 h-2 w-2 rounded-full bg-teal/70" />{step}
        </motion.div>
        {i < steps.length-1 && <div className="absolute left-1/2 top-full h-3 w-px bg-indigo-200 md:left-full md:top-1/2 md:h-px md:w-3"><motion.span className="absolute h-1.5 w-1.5 rounded-full bg-indigo" animate={compact?{left:[0,10,0]}:{top:[0,10,0]}} transition={{duration:1.8,repeat:Infinity,delay:i*.22}} /></div>}
      </div>)}
    </div>
  </div>;
}

function MiniDiagram({ kind }: { kind:"validate"|"compare"|"audit"|"connect"|"admin"|"billing"|"ready" }) {
  const labels = {
    validate:["Incoming records","Integrity review","Validated dataset"], compare:["Clinical records","Comparison layer","Verified results"], audit:["Authorized activity","Protected recording","Operational history"], connect:["Practice","EHR · Clearinghouse · Billing","External partners"], admin:["Inputs","Structured review","Consistent process"], billing:["Records","Comparison","Earlier visibility"], ready:["Activity","Organized history","Audit support"]
  }[kind];
  return <div className="rounded-[1.6rem] border border-slate-200 bg-gradient-to-br from-white to-[#f6f8ff] p-6">
    <div className="flex items-center gap-3">
      {labels.map((label,i)=><div key={label} className="contents">
        <motion.div whileHover={{ y:-3 }} className="flex min-h-20 flex-1 items-center justify-center rounded-xl border border-indigo-100 bg-white px-2 text-center text-xs font-semibold shadow-sm">{label}</motion.div>
        {i<labels.length-1 && <div className="relative h-px w-8 overflow-hidden bg-indigo-200"><motion.span className="absolute h-full w-3 bg-indigo" animate={{x:[-12,32]}} transition={{duration:1.6,repeat:Infinity,delay:i*.25}} /></div>}
      </div>)}
    </div>
    <p className="mt-4 text-[10px] leading-4 text-slate-400">{caption}</p>
  </div>;
}

function RoiCalculator() {
  const [billing,setBilling]=useState(500000); const [hours,setHours]=useState(25); const [cost,setCost]=useState(35);
  const result=useMemo(()=>{ const efficiency=Math.min(.42, .18 + Math.log10(Math.max(billing,10000)/10000)*.055); const saved=Math.round(hours*52*efficiency); return {saved,value:Math.round(saved*cost),improve:Math.round(efficiency*100)}; },[billing,hours,cost]);
  const field=(label:string,value:number,setter:(v:number)=>void,prefix="")=><label className="block"><span className="mb-2 block text-sm font-semibold">{label}</span><div className="flex rounded-xl border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-indigo/20">{prefix&&<span className="px-4 py-3 text-slate-400">{prefix}</span>}<input aria-label={label} type="number" min="0" value={value} onChange={e=>setter(Number(e.target.value))} className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 outline-none" /></div></label>;
  return <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[.9fr_1.1fr] lg:p-10">
    <div className="space-y-5">{field("Average monthly billing volume",billing,setBilling,"$")}{field("Weekly administrative hours",hours,setHours)}{field("Average hourly administrative cost",cost,setCost,"$")}</div>
    <div className="rounded-[1.5rem] bg-ink p-7 text-white">
      <p className="text-sm text-white/60">Illustrative operational estimate</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {[['Annual hours saved',result.saved.toLocaleString()],['Operational value',`$${result.value.toLocaleString()}`],['Productivity improvement',`${result.improve}%`]].map(([k,v])=><div key={k}><div className="text-3xl font-semibold tracking-tight">{v}</div><div className="mt-2 text-xs leading-5 text-white/55">Estimated {k.toLowerCase()}</div></div>)}
      </div>
      <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-5 text-white/45">Illustrative estimates based on your inputs. Actual results vary by workflow and operational processes.</p>
    </div>
  </div>;
}

function ContactForm(){
 const [status,setStatus]=useState(""); const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setStatus("");const form=new FormData(e.currentTarget);const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(form))});const d=await r.json();setBusy(false);setStatus(r.ok?'Thank you. We received your request and will follow up shortly.':d.error||'Please try again.');if(r.ok)e.currentTarget.reset();}
 return <form onSubmit={submit} className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[.06] p-6 sm:p-8">
  <div className="grid gap-4 sm:grid-cols-2"><input required name="name" placeholder="Name" className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-white/20"/><input required type="email" name="email" placeholder="Work email" className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-white/20"/></div>
  <input required name="organization" placeholder="Clinic or organization" className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-white/20"/><textarea name="message" rows={4} placeholder="Tell us what you would like to evaluate" className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-white/20"/>
  <button disabled={busy} className="rounded-full bg-white px-5 py-3 font-semibold text-ink transition hover:-translate-y-0.5 disabled:opacity-60">{busy?'Sending…':'Schedule consultation'}</button>{status&&<p role="status" className="text-sm text-white/70">{status}</p>}
 </form>
}

export default function Site(){
 const [open,setOpen]=useState(false); const faqs=[['How does Klaropoint fit into existing workflows?','Klaropoint is designed to complement existing clinical and administrative systems through structured intake, review, and reconciliation workflows.'],['Do we need to replace our EHR?','No. Klaropoint is intended to work alongside established systems rather than replace the clinical record platform your practice already uses.'],['How is information protected?','The platform is designed around controlled access, isolated clinic environments, secure cloud infrastructure, and continuous activity records.'],['How long does onboarding take?','Timing depends on data sources, operational scope, and integration needs. Guided onboarding establishes a clear sequence for intake, validation, and review.'],['Is a Business Associate Agreement available?','Contractual and compliance requirements are reviewed during the consultation process. Klaropoint is designed for HIPAA-regulated workflows.']];
 return <main id="top" className="overflow-hidden">
  <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl"><div className="container-shell flex h-18 items-center justify-between py-4"><Logo/><nav className="hidden items-center gap-7 text-sm text-slate-600 lg:flex">{['Product','Compliance','Integrations','Security','Pricing'].map(x=><a key={x} href={`#${x.toLowerCase()}`} className="hover:text-ink">{x}</a>)}</nav><div className="hidden items-center gap-3 lg:flex"><a href="#architecture" className="text-sm font-semibold">Explore Sandbox</a><Button href="#contact">Start Free Integrity Check</Button></div><button onClick={()=>setOpen(!open)} className="lg:hidden" aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button></div>{open&&<div className="container-shell space-y-3 border-t border-slate-100 py-5 lg:hidden">{['Product','Compliance','Integrations','Security','Pricing'].map(x=><a onClick={()=>setOpen(false)} className="block py-2" key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}<Button href="#contact">Start Free Integrity Check</Button></div>}</header>

  <section className="relative pb-24 pt-36 sm:pt-44"><div className="absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(circle_at_50%_20%,rgba(79,87,216,.13),transparent_42%)]"/><div className="container-shell text-center"><motion.div {...fade}><div className="eyebrow">Clinical data operations</div><h1 className="mx-auto mt-6 max-w-5xl text-[clamp(3rem,7.6vw,7.2rem)] font-semibold leading-[.91] tracking-[-.065em]">Administrative confidence starts with trusted clinical data.</h1><p className="section-copy mx-auto mt-8 max-w-3xl">Klaropoint continuously validates clinical data, supports payer reconciliation, and maintains audit-ready activity records so ambulatory clinics can spend less time managing administrative complexity and more time supporting patient care.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button href="#contact">Start Free Integrity Check</Button><Button href="#architecture" secondary>Explore Interactive Walkthrough</Button></div></motion.div><motion.div {...fade} transition={{duration:.7,delay:.15}} className="mt-14"><Pipeline/><p className="mt-3 text-xs text-slate-400">Conceptual workflow illustration only. It does not represent the product interface or customer data.</p></motion.div><div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-500">{['Designed for HIPAA-regulated workflows','Secure cloud infrastructure','Continuous audit logging','Structured operational controls'].map(x=><span key={x} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal"/>{x}</span>)}</div></div></section>

  <section id="product" className="bg-mist py-24 sm:py-32"><div className="container-shell"><motion.div {...fade} className="max-w-3xl"><div className="eyebrow">Operational clarity</div><h2 className="section-title mt-5">The administrative work happens between systems.</h2><p className="section-copy mt-7">Clinic teams often spend significant time validating billing information, reviewing payer responses, preparing documentation, and maintaining consistency across disconnected processes. Klaropoint creates a more structured path through that work.</p></motion.div><div className="mt-14 grid gap-5 md:grid-cols-3">{[['Administrative consistency','Reduce repetitive manual review.','admin'],['Billing visibility','Identify discrepancies earlier.','billing'],['Audit readiness','Maintain organized operational records.','ready']].map(([t,d,k])=><motion.article {...fade} key={t} className="rounded-[2rem] border border-slate-200 bg-white p-6"><MiniDiagram kind={k as any}/><h3 className="mt-6 text-xl font-semibold">{t}</h3><p className="mt-2 text-slate-500">{d}</p></motion.article>)}</div></div></section>

  <section className="py-24 sm:py-36"><div className="container-shell space-y-24">{[['Automated data validation','Review incoming records through a consistent integrity process before they move deeper into administrative workflows.','validate'],['Continuous reconciliation','Compare relevant clinical and payment information through a structured review layer that supports earlier follow-up.','compare'],['Audit history','Maintain protected records of authorized activity to support operational transparency and organized review.','audit'],['Secure connections','Create a controlled path between practice systems, clearinghouses, billing workflows, and approved external partners.','connect']].map(([t,d,k],i)=><motion.div {...fade} key={t} className="grid items-center gap-12 lg:grid-cols-2"><div className={i%2?'lg:order-2':''}><div className="eyebrow">Structured workflow {String(i+1).padStart(2,'0')}</div><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{t}</h2><p className="section-copy mt-6 max-w-xl">{d}</p></div><div className={i%2?'lg:order-1':''}><MiniDiagram kind={k as any}/></div></motion.div>)}</div></section>

  <section id="architecture" className="bg-[#f7f8fc] py-24 sm:py-36"><div className="container-shell"><motion.div {...fade} className="mx-auto max-w-3xl text-center"><div className="eyebrow">Platform architecture</div><h2 className="section-title mt-5">Built around secure clinical operations.</h2><p className="section-copy mt-7">A clear operating model connects practice systems to secure processing, integrity services, and meaningful operational visibility.</p></motion.div><motion.div {...fade} className="mt-14"><Pipeline compact/><p className="mt-3 text-center text-xs text-slate-400">{caption}</p></motion.div></div></section>

  <section id="security" className="dark-grid bg-ink py-24 text-white sm:py-36"><div className="container-shell"><motion.div {...fade} className="max-w-3xl"><div className="text-xs font-bold uppercase tracking-[.16em] text-[#8ed2c8]">Security and trust</div><h2 className="section-title mt-5">Designed for trust.</h2><p className="mt-7 text-lg leading-8 text-white/60">Security is treated as an operating principle: clear boundaries, controlled access, reliable infrastructure, and accountable activity records.</p></motion.div><div className="mt-14 grid gap-4 md:grid-cols-2">{[['Isolated environments','Each clinic operates within a logically separated environment designed to maintain clear organizational boundaries.'],['HIPAA-regulated workflows','Klaropoint is designed for healthcare workflows that require thoughtful handling of sensitive operational information.'],['Continuous audit records','Comprehensive activity history supports operational transparency, investigation, and structured review.'],['Secure cloud infrastructure','Resilient cloud architecture is designed around availability, reliability, and data protection.']].map(([t,d])=><motion.article {...fade} key={t} className="rounded-[1.6rem] border border-white/10 bg-white/[.055] p-7"><div className="mb-10 h-px w-full bg-gradient-to-r from-[#8ed2c8] to-transparent"/><h3 className="text-xl font-semibold">{t}</h3><p className="mt-3 leading-7 text-white/55">{d}</p></motion.article>)}</div></div></section>

  <section className="py-24 sm:py-36"><div className="container-shell"><motion.div {...fade} className="mb-12 max-w-3xl"><div className="eyebrow">Operational model</div><h2 className="section-title mt-5">Estimate the value of a more structured workflow.</h2></motion.div><RoiCalculator/></div></section>

  <section id="pricing" className="bg-mist py-24 sm:py-32"><div className="container-shell"><motion.div {...fade} className="mx-auto max-w-4xl rounded-[2.2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-12"><div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]"><div><div className="eyebrow">Simple pricing</div><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Built for ambulatory clinics.</h2><p className="section-copy mt-6">Custom pricing based on clinic size, workflow scope, data sources, and operational needs.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button href="#contact">Schedule Consultation</Button><Button href="#architecture" secondary>Access Sandbox</Button></div></div><div className="rounded-2xl bg-[#f7f8fc] p-6"><p className="text-sm font-semibold">Included capabilities</p><ul className="mt-5 space-y-3 text-sm text-slate-600">{['Data validation','Reconciliation','Audit history','Secure integrations','Guided onboarding','Continuous updates','Email support'].map(x=><li key={x} className="flex gap-3"><Check size={16} className="mt-0.5 text-teal"/>{x}</li>)}</ul></div></div></motion.div></div></section>

  <section id="compliance" className="py-24 sm:py-32"><div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><motion.div {...fade}><div className="eyebrow">Frequently asked questions</div><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Clear answers for responsible evaluation.</h2></motion.div><div>{faqs.map(([q,a],i)=><details key={q} className="group border-b border-slate-200 py-5" open={i===0}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold">{q}<ChevronDown className="shrink-0 transition group-open:rotate-180" size={18}/></summary><p className="mt-4 max-w-2xl leading-7 text-slate-500">{a}</p></details>)}</div></div></section>

  <section id="contact" className="bg-ink py-24 text-white sm:py-32"><div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center"><motion.div {...fade}><div className="text-xs font-bold uppercase tracking-[.16em] text-[#8ed2c8]">Start a conversation</div><h2 className="section-title mt-5">Build confidence into every administrative workflow.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-white/60">Klaropoint helps ambulatory clinics strengthen data integrity, support billing accuracy, and maintain organized audit documentation through secure, structured workflows.</p></motion.div><motion.div {...fade}><ContactForm/></motion.div></div></section>

  <footer className="border-t border-slate-200 py-12"><div className="container-shell"><div className="flex flex-col justify-between gap-10 md:flex-row"><div><Logo/><p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">Trusted clinical data operations for ambulatory healthcare.</p></div><div className="grid grid-cols-2 gap-x-12 gap-y-8 text-sm sm:grid-cols-4">{[['Product','Product','Integrations','Pricing'],['Resources','Documentation','FAQ','Trust Center'],['Company','About','Contact'],['Legal','Privacy','Terms']].map(([h,...items])=><div key={h}><p className="font-semibold">{h}</p><div className="mt-4 space-y-3 text-slate-500">{items.map(x=><a key={x} className="block hover:text-ink" href={x==='Contact'?'#contact':'#'}>{x}</a>)}</div></div>)}</div></div><div className="mt-12 border-t border-slate-200 pt-6 text-xs text-slate-400">© {new Date().getFullYear()} Klaropoint. All rights reserved.</div></div></footer>
 </main>;
}
