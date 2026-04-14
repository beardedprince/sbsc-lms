import { HelpCircle, Mail, MessageSquareText, FileText, ExternalLink, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

const helpTopics = [
  { title: "Course Access Issues", icon: FileText, desc: "Can't access an assigned course?" },
  { title: "Certificate Missing", icon: FileText, desc: "Issues with completion status?" },
  { title: "Platform Feedback", icon: MessageSquareText, desc: "Have ideas to improve the LMS?" },
  { title: "System Outage", icon: LifeBuoy, desc: "Experiencing slow load times?" }
];

const faqs = [
  { q: "How do I reset my password?", a: "Your login is integrated with the Active Directory. Use the company portal to reset." },
  { q: "When are new courses assigned?", a: "Mandatory training is assigned quarterly, usually on the 1st of the month." },
  { q: "Can I access the LMS from home?", a: "Yes, provided you connect through the company VPN or have approved remote portal access." }
];

export default function Support() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-12 text-center border border-primary/10">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
          <HelpCircle className="h-8 w-8" />
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How can we help?</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Search our knowledge base or create a support ticket if you need assistance with the Learning platform.
        </p>
        <div className="mt-8 flex w-full max-w-lg items-center rounded-full bg-card p-2 shadow-sm border border-border">
          <input
            type="text"
            placeholder="Describe your issue..."
            className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
          />
          <Button className="rounded-full px-6">Search</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">Common Topics</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {helpTopics.map((topic, i) => (
                <div key={i} className="group flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md hover:border-primary/30">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <topic.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{topic.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{topic.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-medium text-foreground">{faq.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-2 px-0 text-primary">View all FAQs <ExternalLink className="ml-2 h-4 w-4" /></Button>
          </section>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-heading text-lg font-semibold text-foreground">Still need help?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Our support team is available Mon-Fri, 9am - 5pm.</p>
            
            <div className="mt-6 space-y-4">
              <Button className="w-full gap-2">
                <Mail className="h-4 w-4" /> Contact Support
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <MessageSquareText className="h-4 w-4" /> Start Live Chat
              </Button>
            </div>
          </div>

          <div className="rounded-xl bg-info/10 p-6 border border-info/20">
            <h3 className="font-heading text-sm font-semibold text-info">System Status</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-info/80">LMS Platform</span>
                <span className="flex items-center gap-1.5 text-success font-medium"><div className="h-2 w-2 rounded-full bg-success animate-pulse"></div> Operational</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-info/80">Video Delivery</span>
                <span className="flex items-center gap-1.5 text-success font-medium"><div className="h-2 w-2 rounded-full bg-success"></div> Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
