import { ReactNode } from 'react';

import Nav from './Nav';

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div>
      <div className="fixed inset-y-0 flex w-44 flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r dark:border-gray-800">
          <Nav />
        </div>
      </div>
      <div className="flex flex-1 flex-col pl-44">
        <main className="min-h-screen flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
