'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"
import { api } from '~/trpc/react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface User{
  firstName: string;
  lestName: string;
}

interface Proposal {
  id: number;
  interestedStudies: string | null;
  formLearning: string | null;
  studyTime: string | null;
  contact: string | null;
  createdAt: Date;
  createdBy: User;
}



export function ProposalListComponent() {
  const [ allProposals ] = api.proposal.getAll.useSuspenseQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allProposals.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allProposals.length / itemsPerPage);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">רשימת חברותות</h1>
      <Table>
        <TableCaption>כל הצעות החברותא</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>מעונין ללמוד</TableHead>
            <TableHead>צורת למידה</TableHead>
            <TableHead>זמן הלימוד</TableHead>
            <TableHead>יצירת קשר</TableHead>
            <TableHead>תאריך הצעה</TableHead>
            <TableHead>נוצר ע"י</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((proposal) => (
            <>
              <TableRow 
                key={proposal.id} 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => toggleRow(proposal.id)}
              >
                <TableCell>{proposal.id}</TableCell>
                <TableCell>{proposal.interestedStudies || 'N/A'}</TableCell>
                <TableCell>{proposal.formLearning || 'N/A'}</TableCell>
                <TableCell>{proposal.studyTime || 'N/A'}</TableCell>
                <TableCell>{proposal.contact || 'N/A'}</TableCell>
                <TableCell>{format(proposal.createdAt, 'PPP')}</TableCell>
                <TableCell>{`${proposal.createdBy.firstName} ${proposal.createdBy.lestName}`}</TableCell>
                <TableCell>
                  {expandedRow === proposal.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </TableCell>
              </TableRow>
              {expandedRow === proposal.id && (
                <TableRow>
                  <TableCell colSpan={8} className="bg-gray-50">
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Description:</h3>
                      <p>{proposal.contact}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              isActive={currentPage > 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              isActive={currentPage < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}