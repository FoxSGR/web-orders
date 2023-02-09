export class AbstractController {
  toResponse(data: any) {
    if (Array.isArray(data)) {
      data = { items: data };
    }

    return { data };
  }
}
