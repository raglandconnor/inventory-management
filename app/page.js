import { Metadata } from 'next';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDateRangePicker } from './components/date-range-picker';
import { MainNav } from './components/main-nav';
import { Overview } from './components/overview';
import { RecentSales } from './components/recent-sales';
import { Search } from './components/search';
import TeamSwitcher from './components/team-switcher';
import { UserNav } from './components/user-nav';

export const metadata = {
  title: 'Inventory Dashboard',
  description: 'Inventory management dashboard',
};

export default function DashboardPage() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-start-2 col-span-2 flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
              {/* <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div> */}
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-start-2 col-span-2">
                <TabsList className="">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="search">Search</TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="lg:col-start-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">[num of items]</div>
                    {/* <p className="text-xs text-muted-foreground">
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Unique Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">[num unique items]</div>
                    {/* <p className="text-xs text-muted-foreground">
                    </p> */}
                  </CardContent>
                </Card>
                {/* <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card> */}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="lg:col-start-3 col-span-4">
                  <CardHeader>
                    <CardTitle>Items</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2 pr-10 md:pl-4 md:pr-12">
                    {/* <Overview /> */}
                    {/* Items go here. */}
                    <div className="grid w-full gap-4 mx-4">
                      <Card>
                        <CardHeader>
                          <div className="md:flex md:flex-row md:justify-between">
                            <div>
                              <CardTitle>Item 1</CardTitle>
                              <CardDescription>
                                Item description
                              </CardDescription>
                            </div>
                            <div className="mt-4 md:mt-0 flex flex-row gap-2">
                              <Button>Add</Button>
                              <Button>Remove</Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>image goes here</CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="search" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <div className="lg:col-start-3 col-span-4 flex flex-row gap-2">
                  <Search />
                  <Button>Search</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="lg:col-start-3 col-span-4">
                  <CardHeader>
                    <CardTitle>Items</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2 pr-10 md:pl-4 md:pr-12">
                    {/* <Overview /> */}
                    {/* Items go here. */}
                    <div className="grid w-full gap-4 mx-4">
                      <Card>
                        <CardHeader>
                          <div className="flex flex-row justify-between">
                            <div>
                              <CardTitle>Item 1</CardTitle>
                              <CardDescription>
                                Item description
                              </CardDescription>
                            </div>
                            <div className="flex flex-row gap-2">
                              <Button>Add</Button>
                              <Button>Remove</Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>image goes here</CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
