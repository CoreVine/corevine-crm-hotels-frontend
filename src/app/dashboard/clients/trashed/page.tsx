import { DefaultSearchParams } from "@/types";
import { PaginationLinks } from "../../_components/pagination";
import { ClientsTable } from "../_components/table";
import { SearchFilter } from "../../_components/search";
import { PageTitle } from "../../_components/title";
import { Metadata } from "next";
import { GoBack } from "../../_components/go-back";

import { getTrashedClients } from "../_helpers/actions";

export const metadata: Metadata = {
  title: "Clients"
};

type Props = {
  searchParams: Promise<DefaultSearchParams>;
};

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams;
  const data = await getTrashedClients(search, page);

  return (
    <div>
      <PageTitle label='Trashed Clients'>
        <GoBack />
      </PageTitle>

      <section>
        <SearchFilter />
      </section>

      <section className='mt-4'>
        <ClientsTable clients={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  );
}
