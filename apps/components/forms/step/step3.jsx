"use client";

import { MultipleOptions } from "@/components/multiple-options";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/primitives/ui/form";
import { Input } from "@/components/primitives/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/primitives/ui/select";

export default function Step3({ isLoading, submitForm, genres, tags }) {
  const groupedTags = tags.reduce((acc, curr) => {
    if (!acc[curr.type]) {
      acc[curr.type] = [];
    }
    acc[curr.type].push(curr);
    return acc;
  }, {});

  const worldTags = groupedTags["WORLD"] || [];
  const characterTags = groupedTags["CHARACTER"] || [];
  const sightTags = groupedTags["SIGHT"] || [];
  const factionTags = groupedTags["FACTION"] || [];

  return (
    <>
      <div className="pb-4">
        <h2 className="font-bold ">Thông tin chi tiết</h2>
        <p className="text-sm font-light text-muted-foreground">
          Vui lòng cung cấp thể loại và tác giả cho tác phẩm để thêm vào hệ thống.
        </p>
      </div>
      <FormField
        control={submitForm.control}
        name="authorName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên tác giả</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Hoa Thanh Thần"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                autoFocus={true}
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={submitForm.control}
        name="authorOriginalName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên gốc tác giả</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="赤心巡天"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                autoFocus={true}
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={submitForm.control}
        name="genreId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Thể loại</FormLabel>

            <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thể loại cho tác phẩm" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={submitForm.control}
        name="sightTagIds"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Góc nhìn</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Chỉ có thể chọn 1" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sightTags.map((sight) => (
                  <SelectItem key={sight.id} value={sight.id.toString()}>
                    {sight.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <p className="mt-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {" "}
        Gắn tag cho tác phẩm{" "}
      </p>
      <FormField
        control={submitForm.control}
        name="worldTagIds"
        render={({ field }) => (
          <FormItem>
            <MultipleOptions
              title="Bối cảnh thế giới"
              options={worldTags}
              value={field.value}
              onChange={field.onChange}
              isLoading={isLoading}
            />
          </FormItem>
        )}
      />
      <FormField
        control={submitForm.control}
        name="charTagIds"
        render={({ field }) => (
          <FormItem>
            <MultipleOptions
              title="Tính cách nhân vật"
              options={characterTags}
              value={field.value}
              onChange={field.onChange}
              isLoading={isLoading}
            />
          </FormItem>
        )}
      />
      <FormField
        control={submitForm.control}
        name="facTagIds"
        render={({ field }) => (
          <FormItem>
            <MultipleOptions
              title="Hệ phái, tổ chức"
              options={factionTags}
              value={field.value}
              isLoading={isLoading}
              onChange={field.onChange}
            />
          </FormItem>
        )}
      />
    </>
  );
}
