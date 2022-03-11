class DatabaseFactory {
  static getDatabaseProvider(model: any) {
    return new DatabaseProvider(model);
  }
}

class DatabaseProvider {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  add(entity: Record<string, string>) {
    return this.model.create(entity);
  }

  find(query: Record<string, string>) {
    return this.model.findOne(query);
  }

  findAll(query: Record<string, string>) {
    return this.model.find(query);
  }
}

export default DatabaseFactory;
