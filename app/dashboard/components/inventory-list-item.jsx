import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import { Button } from '@/components/ui/button';

const InventoryListItem = ({
  addItem,
  removeItem,
  name,
  quantity,
  updateInventory,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="md:flex md:flex-row md:justify-between">
          <div>
            <CardTitle>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </CardTitle>
            <CardDescription>Quantity: {quantity}</CardDescription>
          </div>
          <div className="mt-4 md:mt-0 flex flex-row gap-2">
            <Button variant="outline" onClick={() => addItem(name)}>
              Add
            </Button>
            <Button variant="outline" onClick={() => removeItem(name)}>
              Remove
            </Button>
          </div>
        </div>
      </CardHeader>
      {/* <CardContent>[image goes here]</CardContent> */}
    </Card>
  );
};

export default InventoryListItem;
