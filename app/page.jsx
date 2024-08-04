'use client';
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
import { MainNav } from './components/main-nav';
import { Search } from './components/search';
import { UserNav } from './components/user-nav';
import { useState, useEffect } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore';
import { firestore } from '@/firebase';
import InventoryListItem from './components/inventory-list-item';
import { Input } from '@/components/ui/input';
import { CameraIcon, ResetIcon } from '@radix-ui/react-icons';
import { set } from 'date-fns';

export default function DashboardPage() {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [uniqueItems, setUniqueItems] = useState(0);
  const [search, setSearch] = useState('');
  const [searchInventory, setSearchInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateInventory = async () => {
    setIsLoading(true);
    const snapshot = query(collection(firestore, 'inventory'));
    const documents = await getDocs(snapshot);
    const inventoryList = [];

    documents.forEach((document) => {
      inventoryList.push({
        name: document.id,
        ...document.data(),
      });
    });

    setInventory(inventoryList);
    setSearchInventory(inventoryList);
    setIsLoading(false);
  };

  const updateSearchInventory = (searchQuery) => {
    setIsLoading(true);
    setSearchInventory([]);
    inventory.forEach((item) => {
      if (item.name.includes(searchQuery.toLowerCase())) {
        setSearchInventory((prev) => [...prev, item]);
      }
    });
    setIsLoading(false);
  };

  // const clearSearchInventory = () => {
  //   setSearchInventory(inventory);
  // };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          quantity: quantity - 1,
        });
      }
    }

    await updateInventory();
  };

  const addItem = async (item) => {
    item = item.toLowerCase();
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, {
        quantity: quantity + 1,
      });
    } else {
      await setDoc(docRef, {
        quantity: 1,
      });
    }

    await updateInventory();
  };

  useEffect(() => {
    setIsLoading(true);

    setUniqueItems(0);
    setTotalItems(0);

    inventory.forEach(({ quantity }) => {
      setTotalItems((prev) => prev + quantity);
      setUniqueItems((prev) => prev + 1);
    });

    setIsLoading(false);
  }, [inventory]);

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-start-2 col-span-2 flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-start-2 col-span-2">
                <TabsList>
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
                    <div className="text-2xl font-bold">
                      {isLoading ? (
                        <div className="animate-spin h-6 w-6 border-4 border-t-transparent rounded-full"></div>
                      ) : (
                        totalItems
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Unique Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoading ? (
                        <div className="animate-spin h-6 w-6 border-4 border-t-transparent rounded-full"></div>
                      ) : (
                        uniqueItems
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-start-2 col-span-2">
                  <h3 className="text-lg font-bold mb-2 mt-2">Add Items</h3>
                  <div className="flex flex-row justify-center gap-2">
                    <Button variant="outline">
                      <CameraIcon className="scale-125" />
                    </Button>
                    <div className="grid gap-2 w-full">
                      <Input
                        value={itemName}
                        placeholder="Item name"
                        onChange={(e) => {
                          setItemName(e.target.value);
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => {
                        addItem(itemName);
                        setItemName('');
                      }}
                    >
                      Add Item
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="lg:col-start-3 col-span-4">
                  <CardHeader>
                    <CardTitle>Items</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-0 pr-8 md:pl-4 md:pr-12">
                    <div className="grid w-full gap-4 mx-4">
                      {isLoading ? (
                        <div className="animate-spin h-6 w-6 border-4 border-t-transparent rounded-full mx-auto"></div>
                      ) : (
                        inventory.map(({ name, quantity, id }) => {
                          return (
                            <InventoryListItem
                              key={id}
                              addItem={addItem}
                              removeItem={removeItem}
                              name={name}
                              quantity={quantity}
                              updateInventory={updateInventory}
                            />
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="search" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <div className="lg:col-start-3 col-span-4 flex flex-row gap-2">
                  <Search searchQuery={search} setSearchQuery={setSearch} />
                  <Button
                    onClick={() => {
                      updateSearchInventory(search);
                      setSearch('');
                    }}
                  >
                    Search
                  </Button>
                  {searchInventory !== inventory && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchInventory(inventory);
                      }}
                    >
                      <ResetIcon className="scale-125" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="lg:col-start-3 col-span-4">
                  <CardHeader>
                    <CardTitle>Items</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-0 pr-8 md:pl-4 md:pr-12">
                    <div className="grid w-full gap-4 mx-4">
                      {isLoading ? (
                        <div className="animate-spin h-6 w-6 border-4 border-t-transparent rounded-full mx-auto"></div>
                      ) : (
                        searchInventory.map(({ name, quantity, id }) => {
                          return (
                            <InventoryListItem
                              key={id}
                              addItem={addItem}
                              removeItem={removeItem}
                              name={name}
                              quantity={quantity}
                              updateInventory={updateInventory}
                            />
                          );
                        })
                      )}
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
