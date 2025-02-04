import { getMetadataArgsStorage } from 'typeorm';
import { RequestContext } from '@/context/context.model';
import { UnauthorizedException } from '@nestjs/common';

export function getColumnMetadata(entity: Function, fieldName: string) {
  const columns = getMetadataArgsStorage().columns;
  return columns.find(
    (col) => col.target === entity && col.propertyName === fieldName
  );
}

export function getEnumTypes(entity: Function, fieldName: string): (string | number)[] | Object {
  const columns = getMetadataArgsStorage().columns;
  const c = columns.find(
    (col) => col.target === entity && col.propertyName === fieldName
  );
  return c?.options.enum || [] as string[];
}

export function currentUser() {
  return RequestContext.currentContext?.user
}

export function currentUserOrFail() {
  const user = RequestContext.currentContext?.user;
  if (!user) {
    throw new UnauthorizedException()
  }
  return user;
}
