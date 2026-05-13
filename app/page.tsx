import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-12">
      <div className="max-w-2xl mx-auto space-y-12">

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Design System Starter</h1>
          <p className="text-muted-foreground">A collection of reusable components built with shadcn/ui.</p>
        </div>

        {/* Buttons */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Button</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>

        {/* Input */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Input</h2>
          <div className="flex gap-3 max-w-sm">
            <Input placeholder="Enter your email…" type="email" />
            <Button>Subscribe</Button>
          </div>
        </section>

        {/* Card */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Card</h2>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Component ready</CardTitle>
              <CardDescription>Your design system components are installed and working.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Edit <code className="bg-muted px-1 py-0.5 rounded text-xs">app/page.tsx</code> to start building your design system.
              </p>
            </CardContent>
          </Card>
        </section>

      </div>
    </main>
  );
}
