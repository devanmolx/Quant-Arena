"use client"
import { ModelCard } from "@/components/ModelCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { PositionsTable } from "@/components/PositionsTable";
import { CryptoPriceBar } from "@/components/CryptoPriceBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockCryptoPrices } from "@/lib/mockData";
import Header from "@/components/Header";
import { useContext } from "react";
import { AccountContext } from "@/context/AccountContext/AccountContext";

const Index = () => {

  const { accounts } = useContext(AccountContext);

  return (
    <div>
      <Header />
      <CryptoPriceBar prices={mockCryptoPrices} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <PerformanceChart accounts={accounts} />

        <Tabs defaultValue="positions" className="w-full">
          <TabsList className="bg-secondary w-full justify-start border-b border-border rounded-none h-auto p-0">
            <TabsTrigger value="positions" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Positions
            </TabsTrigger>
            <TabsTrigger value="models" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Model Summary
            </TabsTrigger>
            <TabsTrigger value="trades" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Completed Trades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="positions" className="mt-6">
            <PositionsTable accounts={accounts} onlyOpen={true} />
          </TabsContent>

          <TabsContent value="models" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {accounts.map((account, index) => (
                <ModelCard key={account.id} account={account} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trades" className="mt-6">
            <PositionsTable accounts={accounts} onlyOpen={false} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
