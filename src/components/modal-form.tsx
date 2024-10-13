"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { api } from '~/trpc/react'
import { utils } from 'prettier/doc.js'
import { error } from 'console'

const formSchema = z.object({
  interestedStudies: z.string().min(2, {
    message: "אנא מלא מה אתה מעונין ללמוד",
  }),
  studyTime: z.string({
    required_error: "אנא מלא מתי אתה מעונין ללמוד",
  }),
  formLearning: z.string().min(1, {
    message: "אנא מלא באיזה אופן אתה מעונין ללמוד",
  }),
  contact: z.string().min(2, {
    message: "אנא מלא דרך יצירת קשר ",
  }),
})

export function ModalFormComponent() {
  const [isOpen, setIsOpen] = useState(false)

  const createProposal = api.proposal.create.useMutation({
    onSuccess: (data) => {
      console.log("proposal created successfully: ", data);
    },
    onError: (error) => {
      console.log("error creation proposal: ", error);
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interestedStudies: "",
      studyTime: "",
      formLearning: "",
      contact: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createProposal.mutate({
      interestedStudies: values.interestedStudies,
      studyTime: values.studyTime,
      formLearning: values.formLearning,
      contact: values.contact,
    })
    setIsOpen(false) // Close the modal after submission
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ בקשה חדשה</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>בקשת חברותא</DialogTitle>
          <DialogDescription>
            אנא מלא את כל הפרטים
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="interestedStudies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> ? מה אתה מעונין ללמוד</FormLabel>
                  <FormControl>
                    <Input placeholder="גמרא..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studyTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> ? איך אתה מעונין ללמוד</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר מתוך רשימה" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="frontaly">פרונטלי</SelectItem>
                      <SelectItem value="virtualy">וירטואלי</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="formLearning"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> ? מתי אתה מעונין ללמוד</FormLabel>
                  <FormControl>
                    <Input placeholder='ערב...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>יצירת קשר</FormLabel>
                  <FormControl>
                    <Input placeholder="אנא שאר מייל או מס טלפון" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}