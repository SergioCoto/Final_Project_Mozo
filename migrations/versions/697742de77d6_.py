"""empty message

Revision ID: 697742de77d6
Revises: e2c86ad35888
Create Date: 2021-04-27 04:16:01.010284

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '697742de77d6'
down_revision = 'e2c86ad35888'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('CategoryID', sa.Integer(), nullable=False),
    sa.Column('Name', sa.String(length=10), nullable=False),
    sa.PrimaryKeyConstraint('CategoryID'),
    sa.UniqueConstraint('Name')
    )
    op.create_table('ordertype',
    sa.Column('OrderTypeID', sa.Integer(), nullable=False),
    sa.Column('Name', sa.String(length=15), nullable=False),
    sa.PrimaryKeyConstraint('OrderTypeID'),
    sa.UniqueConstraint('Name')
    )
    op.create_table('usertypes',
    sa.Column('TypeID', sa.Integer(), nullable=False),
    sa.Column('Name', sa.String(length=10), nullable=False),
    sa.PrimaryKeyConstraint('TypeID'),
    sa.UniqueConstraint('Name')
    )
    op.create_table('order',
    sa.Column('OrderID', sa.Integer(), nullable=False),
    sa.Column('OrderTypeID', sa.Integer(), nullable=False),
    sa.Column('OrderDate', sa.DateTime(), nullable=False),
    sa.Column('State', sa.String(length=15), nullable=False),
    sa.Column('EstimatedTime', sa.Integer(), nullable=True),
    sa.Column('Notes', sa.String(length=500), nullable=True),
    sa.Column('SubTotal', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Discount', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Tax', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Total', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('ClientName', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['OrderTypeID'], ['ordertype.OrderTypeID'], ),
    sa.PrimaryKeyConstraint('OrderID')
    )
    op.create_table('product',
    sa.Column('ProductID', sa.Integer(), nullable=False),
    sa.Column('CategoryID', sa.Integer(), nullable=True),
    sa.Column('Name', sa.String(length=100), nullable=False),
    sa.Column('Price', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Description', sa.String(length=300), nullable=True),
    sa.Column('ImageURL', sa.String(length=500), nullable=True),
    sa.Column('Available', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['CategoryID'], ['category.CategoryID'], ),
    sa.PrimaryKeyConstraint('ProductID')
    )
    op.create_table('orderdetail',
    sa.Column('OrderDetailID', sa.Integer(), nullable=False),
    sa.Column('OrderID', sa.Integer(), nullable=False),
    sa.Column('ProductID', sa.Integer(), nullable=False),
    sa.Column('Quantity', sa.Integer(), nullable=False),
    sa.Column('SubTotal', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Discount', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Tax', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Total', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['OrderID'], ['order.OrderID'], ),
    sa.ForeignKeyConstraint(['ProductID'], ['product.ProductID'], ),
    sa.PrimaryKeyConstraint('OrderDetailID')
    )
    op.add_column('user', sa.Column('Email', sa.String(length=180), nullable=False))
    op.add_column('user', sa.Column('Name', sa.String(length=100), nullable=False))
    op.add_column('user', sa.Column('Password', sa.String(length=30), nullable=False))
    op.add_column('user', sa.Column('TypeID', sa.Integer(), nullable=False))
    op.add_column('user', sa.Column('UserID', sa.Integer(), nullable=False))
    op.drop_constraint('user_email_key', 'user', type_='unique')
    op.create_unique_constraint(None, 'user', ['Name'])
    op.create_unique_constraint(None, 'user', ['Email'])
    op.create_foreign_key(None, 'user', 'usertypes', ['TypeID'], ['TypeID'])
    op.drop_column('user', 'id')
    op.drop_column('user', 'email')
    op.drop_column('user', 'is_active')
    op.drop_column('user', 'password')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('password', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
    op.add_column('user', sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.add_column('user', sa.Column('email', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
    op.add_column('user', sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False))
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_constraint(None, 'user', type_='unique')
    op.create_unique_constraint('user_email_key', 'user', ['email'])
    op.drop_column('user', 'UserID')
    op.drop_column('user', 'TypeID')
    op.drop_column('user', 'Password')
    op.drop_column('user', 'Name')
    op.drop_column('user', 'Email')
    op.drop_table('orderdetail')
    op.drop_table('product')
    op.drop_table('order')
    op.drop_table('usertypes')
    op.drop_table('ordertype')
    op.drop_table('category')
    # ### end Alembic commands ###