import { ModelCard } from "@/components/ModelCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { PositionsTable } from "@/components/PositionsTable";
import { CryptoPriceBar } from "@/components/CryptoPriceBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockAccounts, mockPositions, generateChartData, modelColors, mockCryptoPrices } from "@/lib/mockData";
import Header from "@/components/Header";

const Index = () => {

  // Use mock data
  const accounts = mockAccounts;
  const positions = mockPositions;
  const chartData = generateChartData();
  const models = Object.keys(modelColors);

  return (
    <div>
      <Header />
      <CryptoPriceBar prices={mockCryptoPrices} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <PerformanceChart
          data={chartData}
          models={models}
          modelColors={modelColors}
          accounts={accounts}
        />

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
            <PositionsTable positions={positions} />
          </TabsContent>

          <TabsContent value="models" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {accounts.map((account, index) => (
                <ModelCard key={account.id} account={account} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trades" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              No completed trades to display
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
