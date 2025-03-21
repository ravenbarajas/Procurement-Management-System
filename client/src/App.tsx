import { Switch, Route } from "wouter";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Procurement from "@/pages/Procurement";
import Vendors from "@/pages/Vendors";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/procurement" component={Procurement} />
        <Route path="/vendors" component={Vendors} />
        <Route path="/reports" component={Reports} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
